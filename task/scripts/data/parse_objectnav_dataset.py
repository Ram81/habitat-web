import argparse
import csv
import copy
import datetime
import glob
import gzip
import json
import os

from collections import defaultdict
from tqdm import tqdm

total_episodes = 0
task_episode_map = defaultdict(list)

def load_dataset(path):
    with gzip.open(path, "rb") as file:
        data = json.loads(file.read(), encoding="utf-8")
    return data


def read_csv(path, delimiter=","):
    file = open(path, "r")
    reader = csv.reader(file, delimiter=delimiter)
    return reader


def read_csv_from_zip(archive, path, delimiter=","):
    file = archive.open(path)
    reader = csv.reader(file, delimiter=delimiter)
    return reader

def write_json(data, path):
    with open(path, 'w') as file:
        file.write(json.dumps(data))


def write_gzip(input_path, output_path):
    with open(input_path, "rb") as input_file:
        with gzip.open(output_path + ".gz", "wb") as output_file:
            output_file.writelines(input_file)


def column_to_json(col):
    if col is None:
        return None
    return json.loads(col)


def is_viewer_step(data):
    if "type" in data.keys():
        if data["type"] == "runStep" and data["step"] == "viewer":
            return True
    return False


def remap_action(action):
    if action == "turnRight":
        return "TURN_RIGHT"
    elif action == "turnLeft":
        return "TURN_LEFT"
    elif action == "moveForward":
        return "MOVE_FORWARD"
    elif action == "moveBackward":
        return "MOVE_BACKWARD"
    elif action == "lookUp":
        return "LOOK_UP"
    elif action == "lookDown":
        return "LOOK_DOWN"
    elif action == "grabReleaseObject":
        return "GRAB_RELEASE"
    elif action == "stepPhysics":
        return "NO_OP"
    return "STOP"


def handle_step(step, episode, unique_id, timestamp):
    if step.get("event"):
        if step["event"] == "setEpisode":
            data = copy.deepcopy(step["data"]["episode"])
            task_episode_map[data["scene_id"]].append(int(data["episode_id"]))

            episode["episode_id"] = unique_id
            episode["scene_id"] = data["scene_id"]
            episode["start_position"] = data["startState"]["position"]
            episode["start_rotation"] = data["startState"]["rotation"]
            episode["object_category"] = data["object_category"]
            episode["start_room"] = data.get("start_room")
            episode["shortest_paths"] = data.get("shortest_paths")
            episode["info"] = data.get("info")
            episode["scene_dataset"] = data.get("scene_dataset")
            episode["scene_state"] = data.get("scene_state")
            episode["goals"] = []

            episode["reference_replay"] = []

        elif step["event"] == "handleAction":
            action = remap_action(step["data"]["action"])
            data = step["data"]
            replay_data = {
                "action": action
            }
            replay_data["agent_state"] = {
                "position": data["agentState"]["position"],
                "rotation": data["agentState"]["rotation"],
                "sensor_data": data["agentState"]["sensorData"]
            }
            episode["reference_replay"].append(replay_data)

    elif step.get("type"):
        if step["type"] == "finishStep":
            return True
    return False


def convert_to_episode(csv_reader):
    episode = {}
    viewer_step = False
    start_ts = 0
    end_ts = 0
    for row in csv_reader:
        unique_id = row[0]
        step = row[1]
        timestamp = row[2]
        data = column_to_json(row[3])

        if start_ts == 0:
            start_ts = int(timestamp)

        if not viewer_step:
            viewer_step = is_viewer_step(data)

        if viewer_step:
            handle_step(data, episode, unique_id, timestamp)
        end_ts = int(timestamp)

    # Append start and stop action
    start_action = copy.deepcopy(episode["reference_replay"][0])
    start_action["action"] = "STOP"
    stop_action = copy.deepcopy(episode["reference_replay"][-1])
    stop_action["action"] = "STOP"
    episode["reference_replay"] = [start_action] + episode["reference_replay"] + [stop_action]
    actual_episode_length = len(episode["reference_replay"])

    start_dt = datetime.datetime.fromtimestamp(start_ts / 1000)
    end_dt = datetime.datetime.fromtimestamp(end_ts / 1000)
    hit_duration = (end_dt - start_dt).total_seconds()

    episode_length = {
        "actual_episode_length": actual_episode_length,
        "hit_duration": hit_duration
    }
    return episode, episode_length


def replay_to_episode(input_path, output_path):
    all_episodes = {
        "episodes": []
    }

    episode_lengths = []
    start_pos_map = {}
    episodes = []
    file_paths = glob.glob(input_path + "/*.csv")
    scene_episode_map = defaultdict(list)
    duplicates = 0
    for file_path in tqdm(file_paths):
        reader = read_csv(file_path)

        episode, counts = convert_to_episode(reader)

        episode_key = str(episode["start_position"]) + "_{}".format(episode["scene_id"])

        if episode_key in start_pos_map.keys():
            duplicates += 1
            continue
        start_pos_map[episode_key] = 1

        scene_episode_map[episode["scene_id"]].append(episode)
        all_episodes["episodes"].append(episode)
        episode_lengths.append(counts)

    print("Total duplicate episodes: {}".format(duplicates))

    objectnav_dataset_path = "data/datasets/objectnav_mp3d_v1/train/content/{}.json.gz"
    for scene, episodes in scene_episode_map.items():
        scene = scene.split("/")[-1].split(".")[0]

        if not os.path.isfile(objectnav_dataset_path.format(scene)):
            print("Source dataset missing: {}".format(scene))
            continue
        episode_data = load_dataset(objectnav_dataset_path.format(scene))
        episode_data["episodes"] = episodes

        path = output_path + "/{}.json".format(scene)
        print(path)
        write_json(episode_data, path)
        write_gzip(path, path)


def show_average(all_episodes, episode_lengths):
    print("Total episodes: {}".format(len(all_episodes["episodes"])))

    total_episodes = len(all_episodes["episodes"])
    total_hit_duration = 0

    total_actions = 0
    for episode_length  in episode_lengths:
        total_hit_duration += episode_length["hit_duration"]
        total_actions += episode_length["actual_episode_length"]

    print("\n\n")
    print("Average hit duration")
    print("All hits: {}, Total duration: {}, Num episodes: {}".format(round(total_hit_duration / total_episodes, 2), total_hit_duration, total_episodes))
    
    print("\n\n")
    print("Average episode length:")
    print("All Hits: {}, Num actions: {}, Num episodes: {}".format(round(total_actions / total_episodes, 2), total_actions, total_episodes))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--path", type=str, default="data/hit_data"
    )
    parser.add_argument(
        "--output-path", type=str, default="data/episodes/data.json"
    )
    args = parser.parse_args()
    replay_to_episode(args.path, args.output_path)


if __name__ == '__main__':
    main()


