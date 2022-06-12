#!/bin/bash
mode=$1
db_path=$2
output_prefix=$3
from_date=$4

prefix=/home/ubuntu/habitat-web

rm ${prefix}/data/hit_data/visualisation/unapproved_hits.zip
rm ${prefix}/data/hit_data/visualisation/sample_unapproved_hits.zip

current_dt=$(date '+%Y-%m-%d %H:%M')

source /home/ubuntu/venv/bin/activate && \
python "${prefix}/scripts/data/download_hit_data.py" --db_path $db_path --dump_path "${prefix}/data/hit_data/visualisation/unapproved_hits" --prefix $output_prefix --mode $mode --from-date "$from_date" --exclude-approved

zip -r ${prefix}/data/hit_data/visualisation/unapproved_hits.zip data/hit_data/visualisation/unapproved_hits

python scripts/data/upload_hits.py --file data/hit_data/visualisation/unapproved_hits.zip --s3-path data/unprocessed_hits/visualization/unapproved_hits.zip

rm ${prefix}/data/hit_data/visualisation/unapproved_hits/*

python scripts/data/sample_hits.py --db_path $db_path --dump_path data/hit_data/visualisation/unapproved_hits/ --mode $mode --from-date "$from_date" --prefix sample

zip -r ${prefix}/data/hit_data/visualisation/sample_unapproved_hits.zip data/hit_data/visualisation/unapproved_hits

python scripts/data/upload_hits.py --file data/hit_data/visualisation/sample_unapproved_hits.zip --s3-path data/unprocessed_hits/visualization/sample_unapproved_hits.zip

rm ${prefix}/data/hit_data/visualisation/unapproved_hits/*
