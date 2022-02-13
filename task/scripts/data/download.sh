#!/bin/bash
mode=$1
db_path=$22

prefix=/home/ubuntu/psiturk-habitat-sim

rm ${prefix}/data/hit_data/visualisation/unapproved_hits.zip

current_dt=$(date '+%Y-%m-%d %H:%M')

source /home/ubuntu/venv/bin/activate && \
python "${prefix}/download_unapproved_hits.py" --db_path $db_path --dump_path "${prefix}/data/hit_data/visualisation/unapproved_hits" --prefix demo --mode $mode --days 1

zip -r ${prefix}/data/hit_data/visualisation/unapproved_hits.zip data/hit_data/visualisation/unapproved_hits


rm ${prefix}/data/hit_data/visualisation/unapproved_hits/*