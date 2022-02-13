import argparse
import json
import requests
import sys
import time

from tqdm import tqdm


SERVER = "https://habitatonweb.cloudcv.org:8000"
APPROVE_HIT_API = "/api/v0/approve_hit"


def get_url(server, api):
    return "{}{}".format(server, api)


def read_json(path):
    f = open(path)
    return json.loads(f.read())


def post_request(url, data):
    response = requests.post(url, data=data)
    return response


def approve_hits(hit_id):
    data = {
        "authToken": "",
        "mode": "live",
        "uniqueId": hit_id,
        "isApproved": True
    }
    url = get_url(SERVER, APPROVE_HIT_API)
    response = post_request(url, json.dumps(data))
    return response


def approve_all_hits(hit_ids):
    for hit_id in tqdm(hit_ids):
        response = approve_hits(hit_id)
        time.sleep(0.5)


def read_all_hits(path="instructions.json"):
    hit_data = read_json(path)
    hit_ids = [ep["episodeId"]for ep in hit_data]
    return hit_ids


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--path", type=str, default="instructions.json"
    )
    args = parser.parse_args()
    hit_ids = read_all_hits(args.path)
    print("Total submitted HITs: {}".format(len(hit_ids)))
    approve_all_hits(hit_ids)
