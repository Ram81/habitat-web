import json
import requests
import time

from collections import defaultdict


task_scenes = [
    "sT4fr6TAbpF.glb", "E9uDoFAP3SH.glb", "29hnd4uzFmX.glb", "ac26ZMwG7aT.glb", "i5noydFURQK.glb", "s8pcmisQ38h.glb", "rPc6DW4iMge.glb", "EDJbREhghzL.glb", "mJXqzFtmKg4.glb", "JeFG25nYj2p.glb", "82sE5b5pLXE.glb", "D7N2EKCX4Sj.glb", "7y3sRwLe3Va.glb", "HxpKQynjfin.glb", "5LpN3gDmAk7.glb", "gZ6f7yhEvPG.glb", "ur6pFq6Qu1A.glb", "qoiz87JEwZ2.glb", "PuKPg4mmafe.glb", "VLzqgDo317F.glb", "aayBHfsNo7d.glb", "XcA2TqTSSAj.glb", "8WUmhLawc2A.glb", "sKLMLpTHeUy.glb", "r47D5H71a5s.glb", "Uxmj2M2itWa.glb", "Pm6F8kyY3z2.glb", "p5wJjkQkbXX.glb", "759xd9YjKW5.glb", "JF19kD82Mey.glb", "V2XKFyX4ASd.glb", "1LXtFkjw3qL.glb", "17DRP5sb8fy.glb", "5q7pvUzZiYa.glb", "VVfe2KiqLaN.glb", "Vvot9Ly1tCj.glb", "ULsKaCPVFJR.glb", "D7G3Y4RVNrH.glb", "uNb9QFRL6hY.glb", "ZMojNkEp431.glb", "vyrNrziPKCB.glb", "e9zR4mvMWw7.glb", "r1Q1Z4BcV1o.glb", "PX4nDJXEHrG.glb", "YmJkqBEsHnH.glb", "b8cTxDM8gDG.glb", "GdvgFV5R1Z5.glb", "pRbA3pwrgk9.glb", "jh4fc5c5qoQ.glb", "1pXnuDYAj8r.glb", "S9hNv5qa7GM.glb", "VFuaQ6m2Qom.glb", "cV4RVeZvu5T.glb", "B6ByNegPMKs.glb", "kEZ7cmS4wCh.glb", "dhjEzFoUFzH.glb",
    'zsNo4HB9uLZ.glb', 'QUCTc6BB5sX.glb', 'X7HyMhZNoso.glb', 'EU6Fwq7SyZv.glb', 'pLe4wQe7qrG.glb', 'TbHJrupSAjP.glb', '2azQ1b91cZZ.glb', 'oLBMNvg9in8.glb', 'x8F5xyUWy9e.glb', '8194nk5LbLH.glb', 'Z6MFQCViBuw.glb'
]

# Gibson scenes
task_scenes = ['Marstons', 'Wainscott', 'Hanson', 'Forkland', 'Shelbyville', 'Ranchester', 'Tolstoy', 'Merom', 'Coffeen', 'Onaga', 'Benevolence', 'Pomaria', 'Hiteman', 'Allensville', 'Woodbine', 'Newfields', 'Stockman', 'Mifflinburg', 'Beechwood', 'Lakeville', 'Pinesdale', 'Cosmos', 'Lindenwood', 'Klickitat', 'Leonardo']

API_ENDPOINT = "https://habitatonweb.cloudcv.org:8000/api/v0/create_hits"


def get_scene_ep_limit():
    f = open("data/scene_ep_map_gibson_v3.json")
    data = json.loads(f.read())
    print("Total episodes: {}".format(sum(data.values())))
    return data


def post_request(url, data):
    response = requests.post(url, data=data)
    return response


def create_hits(tasks=[], start_episode_index=0, end_episode_index=10, batch_size=10):
    episode_data = defaultdict(list)

    batch_end_index = start_episode_index + batch_size
    while start_episode_index < batch_end_index and start_episode_index < end_episode_index:
        for task_id in tasks:
            episode_data[task_id].append(start_episode_index)
        start_episode_index += 1

    data = {
        "authToken": "mySNBpBySb",
        "mode": "live",
        "numAssignments": 1,
        "numWorkers": 1,
        "reward": 0.5,
        "duration": 1.5,
        "taskEpsiodeMap": episode_data
    }
    print(data)
    time.sleep(15)
    response = post_request(API_ENDPOINT, json.dumps(data))
    return response


def create_hits_from_list(tasks=[], episode_ids=[], batch_size=5):
    scene_ep_count_map = get_scene_ep_limit()
    start_episode_index = 0
    for i in range(0, len(episode_ids), batch_size):
        start_episode_index = i
        batch_end_index = start_episode_index + batch_size

        for j in range(0, len(tasks), batch_size):
            episode_data = defaultdict(list)
            task_ids = tasks[j: j+batch_size]
            for task_id in task_ids:
                # scene_id = task_scenes[task_id - 20].split(".")[0]
                scene_id = task_scenes[task_id - 87].split(".")[0]
                for ep_id in episode_ids[start_episode_index:batch_end_index]:
                    # print(task_id, ep_id, scene_ep_count_map[scene_id], scene_id)
                    if ep_id >= scene_ep_count_map[scene_id]:
                        break
                    episode_data[task_id].append(ep_id) # = episode_ids[start_episode_index:batch_end_index]

            if len(episode_data) == 0:
                continue

            data = {
                "authToken": "mySNBpBySb",
                "mode": "live",
                "numAssignments": 1,
                "numWorkers": 1,
                "reward": 0.5,
                "duration": 1.5,
                "taskEpsiodeMap": episode_data
            }
            print(data)
            time.sleep(5)
            response = post_request(API_ENDPOINT, json.dumps(data))
            print(response)


def create_all_hits(tasks, start_episode_index, end_episode_index, batch_size):
    while start_episode_index < end_episode_index:
        response = create_hits(tasks, start_episode_index, end_episode_index, batch_size)
        print(response)
        print("\n")
        start_episode_index += batch_size


if __name__ == "__main__":
    # MP3D tasks
    # tasks = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
    # episode_ids = [i for i in range(360, 370)]
    # create_hits_from_list(tasks, episode_ids)

    # Val episodes
    # tasks = [76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86]
    # episode_ids = [200, 201]

    # Exclude THDA eisodes
    # [19, 21, 27, 35, 36, 39, 53, 60, 62, 64, 73, 75]
    # tasks = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 37, 38, 39, 40, 41, 42, 43, 44, 45, 47, 48, 49, 51, 53, 54, 55, 56, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72, 74]
    
    # Gibson episodes
    exclude_tasks = [87, 91, 94, 111]
    tasks = [88, 89, 90, 92, 93, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
    episode_ids = [i for i in range(350, 400)]

    create_hits_from_list(tasks, episode_ids)
