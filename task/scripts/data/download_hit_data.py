import argparse
import json
import numpy as np
import os
import pandas as pd
import sys
import pymysql

from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta

from collections import defaultdict

pymysql.install_as_MySQLdb()


def get_approved_unique_ids(session, metadata):
    try:
        table = Table("approved_hits", metadata, autoload=True)
        # make a query and loop through
        s = table.select()
        rows = s.execute()

        approved_hits = []
        for row in rows:
            approved_hits.append(row["uniqueid"])
        return approved_hits
    except:
        print("Fetch all approved HITs failed!!")
        return []


def get_scene(data):
    for row in data[:20]:
        step = row["trialdata"]
        if "event" in step.keys():
            if step["event"] == "setEpisode":
                if "scene_id" in step["data"]["episode"]:
                    return step["data"]["episode"]["scene_id"], step["data"]["episode"]["episode_id"]
                return step["data"]["episode"]["sceneID"], step["data"]["episode"]["episodeID"]
    return "", ""


def get_episode_trial_data(data):
    for record in data:
        record['trialdata'] = json.dumps(record['trialdata'])
    return data


def filter_episode(scene_id, scene_dataset):
    if scene_dataset == "all":
        return False
    return not (scene_dataset in scene_id)


def dump_hit_data(db_path, dump_path, dump_prefix, from_date, mode="sandbox", to_date=None, exclude_approved=False, scene_dataset="all"):
    db_user = os.environ.get("DB_USER", "psiturk")
    db_password = os.environ.get("DB_PASSWORD", "password")
    db_host = os.environ.get("DB_HOST", "127.0.0.1")
    db_port = os.environ.get("DB_PORT", 3306)

    db_url = "mysql://{}:{}@{}:{}/{}".format(db_user, db_password, db_host, db_port, db_path)
    
    table_name = "turkdemo"
    data_column_name = "datastring"
    # boilerplace sqlalchemy setup
    engine = create_engine(db_url)
    metadata = MetaData()
    metadata.bind = engine
    Session = sessionmaker(bind=engine)
    session = Session()
    table = Table(table_name, metadata, autoload=True)
    # make a query and loop through
    s = table.select().where(table.c.beginhit > from_date)

    rows = s.execute()

    data = []
    #status codes of subjects who completed experiment
    statuses = [3, 4, 5, 7]
    # if you have workers you wish to exclude, add them here
    exclude = []

    # Exclude already approved hits
    if exclude_approved:
        already_approved_unique_ids = get_approved_unique_ids(session, metadata)
        exclude.extend(already_approved_unique_ids)

    count = 0
    for row in rows:
        hit_date = row['endhit']
        if row['mode'] != mode:
            continue
        if hit_date is None:
            continue
        # only use subjects who completed experiment and aren't excluded
        if row['status'] in statuses and row['uniqueid'] not in exclude and from_date < hit_date:
            if to_date is not None and hit_date < to_date:
                data.append(row[data_column_name])
                count += 1
    del rows
    print("Total episodes: {}".format(count))

    # Now we have all participant datastrings in a list.
    # Let's make it a bit easier to work with:

    # parse each participant's datastring as json object
    # and take the 'data' sub-object
    output_data = []
    question_data = []

    ep_hit_map = {}
    hit_meta = []
    scene_ep_map = defaultdict(int)
    i = 0
    for part in data:
        try:
            part_json = json.loads(part)
            if len(part_json.keys()) <= 0:
                continue
            unique_id = "{}:{}".format(part_json["workerId"], part_json["assignmentId"])
            scene_id, episode_id = get_scene(part_json['data'])
            hit_meta.append({
                "episodeId": unique_id,
                "scene_id": scene_id,
                "episode_id": episode_id,
            })

            if episode_id not in ep_hit_map.keys():
                ep_hit_map[episode_id] = 0
            ep_hit_map[episode_id] += 1
            scene_ep_map[scene_id] +=1

            if len(part_json['questiondata']['feedback']) > 0:
                question_data.append({
                    "workerId": part_json["workerId"],
                    "assignmentId": part_json["assignmentId"],
                    "feedback": part_json['questiondata']['feedback'],
                })

            loaded_data = part_json['data']
            if len(loaded_data) > 0:
                output_data = get_episode_trial_data(loaded_data)
                df = pd.DataFrame(output_data)
                df.to_csv("{}/{}_{}.csv".format(dump_path, dump_prefix, i), index=False, header=False)
                i += 1
        except Exception as e:
            print(e)
            continue

    feedback_df = pd.DataFrame(question_data)
    feedback_df.to_csv("data/feedback/feedback_{}.csv".format(from_date.strftime("%Y-%m-%d")), index=False)

    file = open("data/instructions.json", "w")
    file.write(json.dumps(hit_meta))


def split_hit_data_as_csv(df, dump_path, dump_prefix):
    gdf = df.groupby("uniqueid")
    group_indices = [gdf.get_group(key) for key in gdf.groups]

    i = 0
    for group in group_indices:
        group_df = group.copy()
        group_df = group_df.reset_index(drop=True)
        
        print("HIT: {}, Length: {}".format(i, len(group_df)))
        group_df.to_csv("{}/{}_{}.csv".format(dump_path, dump_prefix, i), index=False, header=False)
        i += 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--db_path", type=str, default="participants.db"
    )
    parser.add_argument(
        "--dump_path", type=str, default="../habitat-lab/data/hit_data"
    )
    parser.add_argument(
        "--prefix", type=str, default="hit_data"
    )
    parser.add_argument(
        "--mode", type=str, default="sandbox"
    )
    parser.add_argument(
        "--from-date", type=str, default="2020-11-01 00:00"
    )
    parser.add_argument(
        "--to-date", type=str, default="2020-11-01 00:00"
    )
    parser.add_argument(
        "--exclude-approved", dest='exclude_approved', action='store_true'
    )
    parser.add_argument(
        "--scene-dataset", type=str, default="all"
    )
    args = parser.parse_args()

    from_date = datetime.strptime(args.from_date, "%Y-%m-%d %H:%M")
    
    to_date = datetime.strptime(args.to_date, "%Y-%m-%d %H:%M")
    if args.to_date == "2020-11-01 00:00":
        to_date = datetime.now()
    print("Downloading data From: " + str(from_date) + ", to: " + str(to_date))

    dump_hit_data(
        args.db_path,
        args.dump_path,
        args.prefix,
        from_date,
        args.mode,
        to_date,
        args.exclude_approved,
        args.scene_dataset
    )
