import argparse
import json
import requests
import time

from collections import defaultdict


task_scenes = ['qz3829g1Lzf.glb', 'PPTLa8SkUfo.glb', 'HeSYRw7eMtG.glb', 'nACV8wLu1u5.glb', 'YmWinf3mhb5.glb', '8wJuSPJ9FXG.glb', 'h6nwVLpAKQz.glb', 'iKFn6fzyRqs.glb', '1UnKg1rAb8A.glb', 'xgLmjqzoAzF.glb', 'gjhYih4upQ9.glb', 'Jfyvj3xn2aJ.glb', 'LcAd9dhvVwh.glb', 'E1NrAhMoqvB.glb', 'g7hUFVNac26.glb', 'JptJPosx1Z6.glb', 'xWvSkKiWQpC.glb', 'oEPjPNSPmzL.glb', '3XYAD64HpDr.glb', 'TSJmdttd2GV.glb', 'yHLr6bvWsVm.glb', 'pcpn6mFqFCg.glb', 'j6fHrce9pHR.glb', 'nS8T59Aw3sf.glb', 'YMNvYDhK8mB.glb', 'vLpv2VX547B.glb', 'gQ3xxshDiCz.glb', 'wPLokgvCnuk.glb', 'wsAYBFtQaL7.glb', 'QN2dRqwd84J.glb', 'DNWbUAJYsPy.glb', 'u9rPN5cHWBg.glb', '226REUyJh2K.glb', 'W16Bm4ysK8v.glb', 'TYDavTf8oyy.glb', 'HxmXPBbFCkH.glb', 'qk9eeNeR4vw.glb', 'QVAA6zecMHu.glb', 'YHmAkqgwe2p.glb', 'hWDDQnSDMXb.glb', 'g8Xrdbe9fir.glb', 'HfMobPm86Xn.glb', 'xAHnY3QzFUN.glb', 'ggNAcMh8JPT.glb', 'v7DzfFFEpsD.glb', 'NEVASPhcrxR.glb', 'VoVGtfYrpuQ.glb', 'oahi4u45xMf.glb', 'Wo6kuutE9i7.glb', '5biL7VEkByM.glb', 'GGBvSFddQgs.glb', '1S7LAXRdDqK.glb', 'gmuS7Wgsbrx.glb', 'RaYrxWt5pR1.glb', 'URjpCob8MGw.glb', 'FRQ75PjD278.glb', 'NGyoyh91xXJ.glb', 'U3oQjwTuMX8.glb', 'CthA7sQNTPK.glb', 'GTV2Y73Sn5t.glb', 'ixTj1aTMup2.glb', '3CBBjsNkhqW.glb', 'DoSbsoo4EAg.glb', 'GtM3JtRvvvR.glb', 'CQWES1bawee.glb', 'b3WpMbPFB6q.glb', 'FnDDfrBZPhh.glb', '4vwGX7U38Ux.glb', 'iigzG1rtanx.glb', '6imZUJGRUq4.glb', 'ACZZiU6BXLz.glb', 'XiJhRLvpKpX.glb', 'Z2DQddYp1fn.glb', 'YJDUB7hWg9h.glb', 'W9YAR9qcuvN.glb', 'NtnvZSMK3en.glb', 'fxbzYAGkrtm.glb', 'vDfkYo5VqEQ.glb', 'MVVzj944atG.glb', '77mMEyxhs44.glb']

API_ENDPOINT = "{}/api/v0/create_hits"


def get_scene_ep_limit():
    f = open("data/scene_ep_map.json")
    data = json.loads(f.read())
    print("Total episodes: {}".format(sum(data.values())))
    return data


def post_request(url, data):
    response = requests.post(url, data=data)
    return response


def create_hits_from_list(
    tasks=[],
    episode_ids=[],
    batch_size=5,
    mode="debug",
    auth_token="",
    host=""
):
    scene_ep_count_map = get_scene_ep_limit()
    start_episode_index = 0
    for i in range(0, len(episode_ids), batch_size):
        start_episode_index = i
        batch_end_index = start_episode_index + batch_size

        for j in range(0, len(tasks), batch_size):
            episode_data = defaultdict(list)
            task_ids = tasks[j: j+batch_size]
            for task_id in task_ids:
                scene_id = task_scenes[task_id]
                for ep_id in episode_ids[start_episode_index:batch_end_index]:
                    if ep_id >= scene_ep_count_map[scene_id.split(".")[0]]:
                        break
                    episode_data[scene_id].append(ep_id)

            if len(episode_data) == 0:
                continue

            data = {
                "authToken": auth_token,
                "mode": mode,
                "numAssignments": 1,
                "numWorkers": 1,
                "reward": 0.5,
                "duration": 1.5,
                "taskEpsiodeMap": episode_data
            }
            print(data)
            time.sleep(5)
            response = post_request(API_ENDPOINT.format(host), json.dumps(data))
            print(response)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--mode", type=str, default="debug"
    )
    parser.add_argument(
        "--auth-token", type=str, default=""
    )
    parser.add_argument(
        "--host", type=str, default="http://localhost:8000"
    )
    args = parser.parse_args()
    
    # Gibson episodes
    tasks = [i for i in range(11, 80) ]
    episode_ids = [i for i in range(0, 1)]

    create_hits_from_list(
        tasks, episode_ids, mode=args.mode, auth_token=args.auth_token, host=args.host
    )
