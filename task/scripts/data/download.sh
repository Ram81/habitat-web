#!/bin/bash
mode=$1
db_path=$22

prefix=/home/ubuntu/psiturk-habitat-sim

rm ${prefix}/data/hit_data/visualisation/unapproved_hits.zip

current_dt=$(date '+%Y-%m-%d %H:%M')

source /home/ubuntu/venv/bin/activate && \
python "${prefix}/download_unapproved_hits.py" --db_path $db_path --dump_path "${prefix}/data/hit_data/visualisation/unapproved_hits" --prefix demo --mode $mode --days 1

zip -r ${prefix}/data/hit_data/visualisation/unapproved_hits.zip data/hit_data/visualisation/unapproved_hits

python upload_hits_to_s3.py

current_dt=$(date '+%Y_%m_%d')
python upload_hits_to_s3.py --file ${prefix}/data/hit_data/visualisation/unapproved_hits.zip --s3-path data/unprocessed_hits/unapproved_hits_${current_dt}.zip

rm ${prefix}/data/hit_data/visualisation/unapproved_hits/*