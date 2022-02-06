# Habitat-Web

This repository is the implmentation of data collection application for project Learning Embodied Visual Exploration from Humans.

Psiturk Habitat Sim is a web-based application to collect human demonstrations for embodied tasks at scale by connecting Habitat simulator to Amazon Mechanical Turk users. [Here's](https://docs.google.com/presentation/d/1Vp1anxvh3PLV_S15eKRoGvaXp1y_XbleUrKh5kXzB0I/edit?usp=sharing) the deck of slides explaining the system design of the application.

## Setup

This project is developed with Python 3.6. If you are using [miniconda](https://docs.conda.io/en/latest/miniconda.html) or [anaconda](https://anaconda.org/), you can create an environment:

```bash
conda create -n venv python3.6
conda activate venv
conda install --file requirements.txt
```

### Data

Like Habitat-Lab, we expect a `data` folder (or symlink) with a particular structure in the top-level directory of this project.  

#### Pick and Place task

In the pick-and-place task, an agent must execute an instruction of the form `Place the <object> on the <receptacle>`. The agent must explore and navigate to the object, pick it up, explore and navigate to the receptacle, and place the object on it. The assets needed to run data collection for Pick and Place task can be downloaded [here](https://drive.google.com/file/d/15vNDIizjdihsvJDLnmTxUbIT0LiAUIAr/view?usp=sharing). Extract the contents of `data.zip` to `psiturk-habitat-sim/data`.

### Nginx

1. Update the paths in `nginx.conf` to your `psiturk-habitat-sim` copy (lines 18, 24, and 30).
2. Copy/move the `nginx.conf` file to `/etc/nginx/sites-available/some-unique-config-name`
3. Run
    ```
    ln -s /etc/nginx/sites-available/name-of-your-config /etc/nginx/sites-enabled/
    service nginx reload
    ```
    to enable the new nginx server conf


### Usage

1. Configure psiturk server port in `config.txt` (default: 8080), point to the same port in `nginx.conf`
2. To start the psiturk server run:
    ```
    cd /path/to/psiturk-habitat-sim
    psiturk -e "server on"
    ```
3. Open `http://localhost:8000/` or `http://localhost:YOUR_ENDPOINT_PORT/` in your browser to access psiturk interface. Note that you must use `localhost` instead of `127.0.0.1` as the compiled habitat-sim application will attempt to load scene data from S3 otherwise.

Experiment config can be modified by making changes to `config.txt`. You can find the documentation of psiturk configuration files [here](https://psiturk.readthedocs.io/en/python2/configuration.html).


## Data Collection and Monitoring

### Launching HITs

1. To launch and manage HITs refer to psiturk [documentation](https://psiturk.readthedocs.io/en/python2/command_line/hit.html).


### Monitoring HITs

1. To collected data for successful HITs refer to psiturk [documentation](https://psiturk.readthedocs.io/en/python2/retrieving.html).

2. Collected data can also be downloaded using the sample script from `scripts/data/download_hit_data.py`. Run the following command to download collected data:
    ```
    python scripts/data/download_hit_data.py --db_path <db_name> --dump_path /path/to/dump/data/ --mode <psiturk_server_mode>
    ```
    `--mode` - Psiturk server mode. Refer the [documentation](https://psiturk.readthedocs.io/en/python2/command_line/mode.html)

