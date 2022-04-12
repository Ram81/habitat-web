# this file imports custom routes into the experiment server
import datetime
import numpy as np
import pytz
import random

from json import loads
from dateutil import parser

from flask import Blueprint, request, jsonify, Response, abort, current_app
from jinja2 import TemplateNotFound
from sqlalchemy import and_

# Database setup
from psiturk.db import db_session
from psiturk.psiturk_config import PsiturkConfig
from psiturk.experiment_errors import ExperimentError
from psiturk.user_utils import PsiTurkAuthorization
from psiturk.amt_services_wrapper import MTurkServicesWrapper
from psiturk.psiturk_config import PsiturkConfig

from orm.models import WorkerHitData, AuthTokens, ApprovedHits, HitEpisodeLimit


# load the configuration options
config = PsiturkConfig()
config.load_config()
# if you want to add a password protect route use this
myauth = PsiTurkAuthorization(config)

# explore the Blueprint
custom_code = Blueprint('custom_code', __name__,
                        template_folder='templates', static_folder='static')


utc=pytz.UTC
MAX_HITS_PER_TURKER = 100
blacklisted_workers = []


def is_valid_request(request_data):
    if not "hitId" in request_data.keys() or not "workerId" in request_data.keys() or not "assignmentId" in request_data.keys():
        return False
    return True


def get_unique_task_id(task_id, episode_id):
    return "{}:{}".format(task_id, episode_id)


def get_current_time():
    return datetime.datetime.now(datetime.timezone.utc)


def is_incomplete_hit_data(worker_hit_data, assignment_id=""):
    current_time = get_current_time()
    # Check if HIT was completed
    if worker_hit_data.task_complete:
        return False

    # Check if HIT was started 60 minutes ago and is still in progress
    task_start_time = worker_hit_data.task_start_time.replace(tzinfo=utc)
    time_diff_in_minutes = (current_time - task_start_time).total_seconds() / 60.0
    if time_diff_in_minutes <= 60 and worker_hit_data.task_in_progress and worker_hit_data.assignment_id == assignment_id:
        return True
    if time_diff_in_minutes > 60 and worker_hit_data.task_in_progress:
        return True
    return False


def get_worker_hit_data(unique_id):
    try:
        return WorkerHitData.query.get(unique_id)
    except Exception:
        return None


def get_user_auth_token(auth_token):
    try:
        return AuthTokens.query.get(auth_token)
    except Exception:
        return None


def create_worker_hit_data(unique_id, task_id, worker_id, assignment_id, hit_id, episode_id, mode):
    try:
        worker_hit_data = get_worker_hit_data(unique_id)
        if worker_hit_data is None:
            worker_hit_data = WorkerHitData(
                uniqueid=unique_id,
                task_id=task_id,
                worker_id=worker_id,
                assignment_id=assignment_id,
                hit_id=hit_id,
                episode_id=episode_id,
                task_in_progress=True,
                task_start_time=get_current_time(),
                mode=mode
            )
            db_session.add(worker_hit_data)
        else:
            if worker_hit_data.task_complete:
                return None, "already_complete"
            worker_hit_data.task_id = task_id
            worker_hit_data.worker_id = worker_id
            worker_hit_data.assignment_id = assignment_id
            worker_hit_data.task_in_progress = True
            worker_hit_data.task_start_time = get_current_time()
            worker_hit_data.mode = mode
        db_session.commit()

        return worker_hit_data, None
    except Exception as e:
        current_app.logger.error("Error saving {}".format(e))
        return None, "error"


@custom_code.route("/api/v0/completed_episodes", methods=['POST'])
def get_completed_episodes():
    # Print message to server.log for debugging
    current_app.logger.info("Reached /api/v0/completed_episodes")

    request_data = loads(request.data)
    if not is_valid_request(request_data) or not request_data.get("taskIds") or not request_data.get("episodeIds") or not request_data.get("perEpisodeLimit"):
        current_app.logger.error("Error /api/v0/completed_episodes misssing inputs!")
        raise ExperimentError("improper_inputs")

    try:
        hit_id = request_data["hitId"]
        worker_id = request_data["workerId"]
        assignment_id = request_data["assignmentId"]
        task_episode_limit = request_data["perEpisodeLimit"]
        mode = request_data["mode"]

        # Use in cases where num asssignments per HIT is greater than total number of episodes
        task_ids = []
        episode_ids = []

        if mode == "debug":
            hit_episodes = HitEpisodeLimit.query.all()
            task_id_episode_id_pair = []
            for hit_episode in hit_episodes:
                task_id_episode_id_pair.append({
                    "task_id": hit_episode.task_id,
                    "episode_id": hit_episode.episode_id,
                })
            random_idx = random.choice(range(0, len(task_id_episode_id_pair)))
            task_ids = [task_id_episode_id_pair[random_idx]["task_id"]]
            episode_ids = [task_id_episode_id_pair[random_idx]["episode_id"]]
        else:
            try:
                hit_episode_limit = HitEpisodeLimit.query.get(hit_id)
                task_episode_limit = hit_episode_limit.num_assignments
                hit_task_id = hit_episode_limit.task_id
                hit_episode_id = hit_episode_limit.episode_id
                task_ids = [hit_task_id]
                episode_ids = [hit_episode_id]
                current_app.logger.error("HIT limit from db for id: {}, limit {}".format(hit_id, task_episode_limit))
            except Exception as e:
                current_app.logger.error("HIT limit from db get failed: {}  -- {}".format(hit_id, e))
                if mode != "debug":
                    response = {"hit_limit_get_fail": True, "error": "Error occured when getting hit limit"}
                    return jsonify(**response)
                # fallback to default task episode ids
                task_ids = request_data["taskIds"]
                episode_ids = request_data["episodeIds"]

        episodes = WorkerHitData.query.filter(and_(WorkerHitData.mode == mode, WorkerHitData.hit_id == hit_id))
        task_episode_id_hit_count_map = {}
        for episode in episodes:
            task_id = episode.task_id
            episode_id = episode.episode_id
            unique_task_id = get_unique_task_id(task_id, episode_id)

            # Ignore incomplete HITs when counting in limit
            if is_incomplete_hit_data(episode, assignment_id):
                continue
            if not task_episode_id_hit_count_map.get(unique_task_id):
                task_episode_id_hit_count_map[unique_task_id] = 0
            task_episode_id_hit_count_map[unique_task_id] += 1

        worker_episodes = WorkerHitData.query.\
            filter(and_(WorkerHitData.worker_id == worker_id, WorkerHitData.mode == mode,
             WorkerHitData.task_id == task_ids[0], WorkerHitData.episode_id == episode_ids[0]))

        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        total_worker_episodes = WorkerHitData.query.\
            filter(and_(WorkerHitData.worker_id == worker_id, WorkerHitData.mode == mode, WorkerHitData.task_start_time > today))

        if total_worker_episodes.count() > MAX_HITS_PER_TURKER or worker_id in blacklisted_workers:
            current_app.logger.error("HIT limit reached: {}".format(worker_id))
            response = {"max_episodes_reached": True}
            return jsonify(**response)

        worker_task_episode_map = {}
        for worker_episode in worker_episodes:
            task_id = worker_episode.task_id
            episode_id = worker_episode.episode_id
            unique_task_id = get_unique_task_id(task_id, episode_id)
            # Ignore incomplete HITs when counting in limit
            if is_incomplete_hit_data(worker_episode, assignment_id):
                continue
            if not worker_task_episode_map.get(unique_task_id):
                worker_task_episode_map[unique_task_id] = 0
            worker_task_episode_map[unique_task_id] += 1
        
        # Check if worker has already completed all episodes and find available episodes
        all_episode_completed = True
        eligible_task_episode = []
        for task_id in task_ids:
            for episode_id in episode_ids:
                unique_task_id = get_unique_task_id(task_id, episode_id)
                if not worker_task_episode_map.get(unique_task_id):
                    all_episode_completed = False
                    # Fetch episode count and check if it is less than limit
                    episode_count = task_episode_id_hit_count_map.get(unique_task_id)
                    if not episode_count:
                        eligible_task_episode.append(unique_task_id)

        if all_episode_completed:
            response = {"all_episodes_completed": all_episode_completed}
            return jsonify(**response)
        
        if len(eligible_task_episode) == 0:
            response = {"no_episodes_available": True}
            return jsonify(**response)
        
        # Allocate the task episode slot
        idx = np.random.choice(len(eligible_task_episode))
        task_id = eligible_task_episode[idx].split(":")[0]
        episode_id = int(eligible_task_episode[idx].split(":")[1])

        unique_id = "{}:{}".format(worker_id, assignment_id)
        worker_hit_data, result = create_worker_hit_data(
            unique_id, task_id, worker_id,
            assignment_id, hit_id, episode_id, mode
        )
        current_app.logger.error(eligible_task_episode)

        if worker_hit_data is None or result == "error":
            response = {"retry": True}
            return jsonify(**response)
        
        if result == "already_complete":
            response = {"already_complete": True}
            return jsonify(**response)

        response = {
            "taskId": worker_hit_data.task_id,
            "episodeId": worker_hit_data.episode_id
        }
        return jsonify(**response)

    except TemplateNotFound:
        abort(404)
    except Exception as e:
        current_app.logger.error("Error occurred get complete episode {}".format(e))
        response = {"error": "Some error occured while allocating HIT"}
        return jsonify(**response)


@custom_code.route('/api/v0/worker_hit_complete', methods=['POST'])
def worker_hit_complete():
    request_data = loads(request.data)
    if not is_valid_request(request_data):
        raise ExperimentError('improper_inputs')
    unique_id = "{}:{}".format(request_data["workerId"], request_data["assignmentId"])
    try:
        worker_hit_data = get_worker_hit_data(unique_id)

        worker_hit_data.flythrough_complete = request_data["flythroughComplete"]
        worker_hit_data.training_task_complete = request_data["trainingTaskComplete"]
        worker_hit_data.task_complete = request_data["taskComplete"]
        worker_hit_data.flythrough_end_time = parser.parse(request_data["flythroughEndTime"])
        worker_hit_data.training_end_time = parser.parse(request_data["trainingEndTime"])
        worker_hit_data.task_end_time = datetime.datetime.now(datetime.timezone.utc)
        db_session.commit()
        resp = {"worker_hit_data_added": "success"}
        return jsonify(**resp)
    except Exception as e:
        current_app.logger.error("Error /api/v0/worker_hit_complete {}".format(e))
        abort(404)  # again, bad to display HTML, but...


@custom_code.route('/api/v0/worker_flythrough_training_skip', methods=['POST'])
def worker_flythrough_training_skip():
    request_data = loads(request.data)
    if not "workerId" in request_data.keys():
        raise ExperimentError('improper_inputs')

    try:
        worker_id = request_data["workerId"]
        mode = request_data["mode"]

        flythrough_seen_count = WorkerHitData.query.\
            filter(and_(WorkerHitData.flythrough_complete == True, WorkerHitData.worker_id == worker_id, WorkerHitData.mode == mode)).count()

        flythrough_seen = (flythrough_seen_count > 0)
        
        training_task_seen_count = WorkerHitData.query.\
            filter(and_(WorkerHitData.training_task_complete == True, WorkerHitData.worker_id == worker_id, WorkerHitData.mode == mode)).count()
        
        training_task_seen = (training_task_seen_count > 0)

        resp = {
            "flythrough_complete": flythrough_seen,
            "training_task_complete": training_task_seen,
        }
        current_app.logger.error("Data /api/v0/completed_episodes misssing {}".format(resp))
        return jsonify(**resp)
    except Exception as e:
        current_app.logger.error("Error /api/v0/worker_hit_complete {}".format(e))
        abort(404)  # again, bad to display HTML, but...


@custom_code.route('/api/v0/approve_hit', methods=['POST'])
def approve_hit():
    request_data = loads(request.data)
    if not "authToken" in request_data.keys() or not "uniqueId" in request_data.keys():
        raise ExperimentError('improper_inputs')

    try:
        auth_token = request_data["authToken"]
        unique_id = request_data["uniqueId"]
        mode = request_data["mode"]
        is_approved = request_data["isApproved"]
        worker_id = unique_id.split(":")[0]
        assignment_id=unique_id.split(":")[1]
        user = get_user_auth_token(auth_token)

        is_sandbox = mode in ["debug", "sandbox"]

        if user is None:
            current_app.logger.error("Unauthorized /api/v0/get_all_unapproved_hits {} -- {}".format(is_sandbox, auth_token))
            return Response('Invalid auth token!', 401)
        
        existing_hit_count = ApprovedHits.query.\
            filter(and_(ApprovedHits.uniqueid == unique_id, ApprovedHits.mode == mode)).count()
        
        if existing_hit_count == 1:
            return Response('Already approved!', 203)
        
        if existing_hit_count > 1:
            return Response('Multiple HITs with same assignmentId!', 203)
        
        approved_hit = ApprovedHits(
            uniqueid=unique_id,
            worker_id=worker_id,
            assignment_id=assignment_id,
            mode=mode,
            is_approved=str(is_approved)
        )

        db_session.add(approved_hit)
        db_session.commit()

        try:
            amt_services_wrapper = MTurkServicesWrapper(sandbox=is_sandbox)
            amt_services_wrapper.set_sandbox(is_sandbox)
            current_app.logger.error("In HIT approve/reject using api: {}".format(is_approved))
            if is_approved == True:
                amt_services_wrapper.approve_assignment_by_assignment_id(assignment_id, all_studies=False)
        except Exception as e:
            current_app.logger.error("Error get amt_services_wrapper {}".format(e))

        return Response('Approved!', 200)
    except Exception as e:
        current_app.logger.error("Error /api/v0/approve_hit {}".format(e))
        abort(404)  # again, bad to display HTML, but...


@custom_code.route('/api/v0/create_hits', methods=['POST'])
def create_hits():
    request_data = loads(request.data)
    if not "authToken" in request_data.keys():
        raise ExperimentError('improper_inputs')

    try:
        auth_token = request_data["authToken"]
        mode = request_data["mode"]
        num_workers = request_data["numWorkers"]
        reward = request_data["reward"]
        duration = request_data["duration"]
        task_map = request_data["taskEpsiodeMap"]
        num_assignments = 5
        user = get_user_auth_token(auth_token)

        is_sandbox = mode in ["debug", "sandbox"]

        task_episode_id_list = []
        for task_id, episodes in task_map.items():
            for episode_id in episodes:
                task_episode_id_list.append((task_id, episode_id))

        if user is None:
            current_app.logger.error("Unauthorized /api/v0/create_hits {} -- {}".format(is_sandbox, auth_token))
            return Response('Invalid auth token!', 401)

        try:
            hit_ids = []
            for task_id, episode_id in task_episode_id_list:
                amt_services_wrapper = MTurkServicesWrapper(sandbox=is_sandbox)
                amt_services_wrapper.set_sandbox(is_sandbox)
                current_app.logger.error("In HIT create using api")
                response = amt_services_wrapper.create_hit(num_workers=num_workers, reward=reward, duration=duration)
                current_app.logger.error("HIT {} created for config".format(response))
                current_app.logger.error("HIT {} created for config".format(response.data))
                hit_id = response.data["hit_id"]
                current_app.logger.error("HIT {} created for config:\n num_workers: {}, reward: {}, duration: {}".format(hit_id, num_workers, reward, duration))

                hit_episode_limit = HitEpisodeLimit(
                    uniqueid=hit_id,
                    hit_id=hit_id,
                    task_id=task_id,
                    episode_id=episode_id,
                    num_assignments=num_assignments,
                    mode=mode,
                    created_at=datetime.datetime.now(datetime.timezone.utc)
                )
                db_session.add(hit_episode_limit)
                db_session.commit()
                
                hit_ids.append(hit_id)

                current_app.logger.error("HIT episode limit created for HIT id: {}, num_assignments : {}".format(hit_id, num_assignments))
            response = {
                "hit_id": hit_ids,
                "task_episode_id_map": task_episode_id_list,
                "num_assignments": num_assignments
            }
            return jsonify(**response)
        except Exception as e:
            current_app.logger.error("Error get amt_services_wrapper {}".format(e))
            return jsonify(**{"error": "Error occurred when creating HIT!"})

    except Exception as e:
        current_app.logger.error("Error /api/v0/approve_hit {}".format(e))
        abort(404)  # again, bad to display HTML, but...


@custom_code.route('/api/v0/is_approved', methods=['POST'])
def is_hit_already_approved():
    request_data = loads(request.data)
    if not "uniqueId" in request_data.keys():
        raise ExperimentError('improper_inputs')

    try:
        unique_id = request_data["uniqueId"]
        mode = request_data["mode"]

        existing_hit = ApprovedHits.query.\
            filter(and_(ApprovedHits.uniqueid == unique_id, ApprovedHits.mode == mode))

        data = {
            "question_data": "",
            "message": ""
        }
        try:
            participant_data = Participant.query.get(unique_id)
            if participant_data is not None:
                question_data = participant_data.get_question_data()
                data["question_data"] = question_data.split(",")[-1]
        except Exception as e:
            current_app.logger.error("Error /api/v0/is_approved get participant {}".format(e))

        if existing_hit.count() == 1 and existing_hit[0].is_approved == "True":
            data["message"] = 'HIT already approved!'
            return jsonify(**data)
        
        if existing_hit.count() == 1 and existing_hit[0].is_approved == "False":
            data["message"] = 'HIT rejected!'
            return jsonify(**data)
        
        if existing_hit.count() > 1:
            data["message"] = 'Multiple HITs with same assignmentId!'
            return jsonify(**data)
        
        data["message"] = "Not already approved"
        return jsonify(**data)
    except Exception as e:
        current_app.logger.error("Error /api/v0/approve_hit {}".format(e))
        abort(404)  # again, bad to display HTML, but...


@custom_code.route('/api/v0/get_hits_assignment_submitted_count', methods=['POST'])
def get_hits_assignment_submitted_count():
    request_data = loads(request.data)
    # if not "authToken" in request_data.keys():
    #     raise ExperimentError('improper_inputs')

    try:
        mode = request_data["mode"]
        scene_id = request_data["sceneId"]
        if scene_id == 0:
            scene_id += 1
        current_app.logger.error("SceneId /api/v0/get_hits_assignment_submitted_count {} -- {}".format(scene_id, task_data["tasks"]))

        is_sandbox = mode in ["debug", "sandbox"]

        try:
            hit_ids = []
            all_hit_episode_limt = HitEpisodeLimit.query.filter(and_(HitEpisodeLimit.mode == mode, HitEpisodeLimit.task_id == scene_id))
            current_app.logger.error("Count id  {}".format(all_hit_episode_limt.count()))
                        
            all_hit_meta = {
                "submitted_assignments": 0,
                "approved_assignments": 0,
                "total_assignments": 0,
            }
            hit_ids = [hit_episode_limit.hit_id for hit_episode_limit in all_hit_episode_limt]
            all_hit_meta["total_assignments"] = len(hit_ids)

            completed_hits = WorkerHitData.query.filter(and_(WorkerHitData.mode == mode, WorkerHitData.task_id == scene_id, WorkerHitData.task_complete == True))
            all_hit_meta["submitted_assignments"] = completed_hits.count()

            # if len(hit_ids) != 0:
            #     amt_services_wrapper = MTurkServicesWrapper(sandbox=is_sandbox)
            #     amt_services_wrapper.set_sandbox(is_sandbox)

            #     response = amt_services_wrapper.get_assignments(hit_ids=hit_ids, assignment_status="Submitted")
            #     assignments = response.data["assignments"]
            #     all_hit_meta["submitted_assignments"] = len(assignments)

            #     del assignments

            #     response = amt_services_wrapper.get_assignments(hit_ids=hit_ids, assignment_status="Approved")
            #     assignments = response.data["assignments"]
            #     all_hit_meta["approved_assignments"] = len(assignments)

            #     del assignments

            current_app.logger.error("Total HITS {}".format(len(hit_ids)))
            response = {
                "hit_meta": [],
                "all_hit_meta": all_hit_meta,
            }
            return jsonify(**response)
        except Exception as e:
            current_app.logger.error("Error get amt_services_wrapper {}".format(e))
            return jsonify(**{"error": "Error occurred when gettings assignments for HIT!"})

    except Exception as e:
        current_app.logger.error("Error /api/v0/get_hits_assignment_submitted_count {}".format(e))
        abort(404)  # again, bad to display HTML, but...

