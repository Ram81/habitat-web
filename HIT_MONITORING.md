
## Data Collection and Monitoring

### Launch HITs

To launch and manage HITs using PsiTurk shel refer to PsiTurk [documentation](https://psiturk.readthedocs.io/en/python2/command_line/hit.html).

We provide a utility script `task/scripts/monitoring/launch_hits.py` to create HITs on Habitat-Web. Here's an example of usage:

```
python scripts/monitoring/launch_hits.py --mode <psiturk_server_mode> --auth-token <auth_token> --host <api_host_url>
```

- `--mode` - PsiTurk server mode. Refer to the [documentation](https://psiturk.readthedocs.io/en/python2/command_line/mode.html)
- `--auth-token`: is a valid authorization token available in `auth_tokens` table of your experiment database.
- `--host`: URL on which Habitat-Web app is hosted.


### Download HITs

1. Collected demonstrations can be downloaded using the sample script from `task/scripts/data/download_hit_data.py`. Run the following command to download collected demonstrations:

    ```bash
    python task/scripts/data/download_hit_data.py --db_path <db_name> --dump_path /path/to/dump/data/ --mode <psiturk_server_mode>
    ```
    `--mode` - PsiTurk server mode. Refer to the [documentation](https://psiturk.readthedocs.io/en/python2/command_line/mode.html)

For more detailed documentation on data collection and monitoring refer following [doc](https://github.com/Ram81/habitat-web/blob/master/HIT_MONITORING.md).


### Convert HITs to Habitat Task Dataset

1. We provide a example script at `tasks/scripts/data/parse_objectnav_dataset.py` to convert collected HITs for ObjectNav to Habitat ObjectNav task dataset. Run the following command to convert collected ObjectNav demonstrations to a task dataset:

    ```bash
    python task/scripts/data/parse_objectnav_dataset.py --path /path/to/dump/data/ --output-path /path/to/dump/task/dataset/
    ```

### Visualize Demonstrations

To visualize collected demonstrations you can use demonstration replay utilities in [`habitat-imitation-baselines`](https://github.com/Ram81/habitat-imitation-baselines). Set up `habitat-imitation-baselines` and use the following command to visualize collected demonstrations:

    ```bash
    python examples/objectnav_replay.py --path /path/to/dumped/task/dataset/train/train.json.gz
    ```
