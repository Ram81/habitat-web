## HIT approval

### Setup

1. Download unapproved HIT data using `python download_unapproved_hits.py --db_path participants.db --dump_path ../habitat-lab/data/hit_data --prefix hit_data`
2. Go to `habitat-lab`
3. Parse HIT episodes using
```
python psiturk_dataset/parser.py --replay-path data/hit_data --output-path data/hit_approvals/task_1.json
```
4. Generate HIT episode videos using
```
python examples/rearrangement_replay.py --replay-episode data/hit_approvals/task_1.json.gz --output-prefix demo
```
5. Copy episode videos using
```
cp demos/ ../psiturk-habitat-sim/data/hit_data/video/
```
6. Copy episode metadata from `instructions.json` to `psiturk-habitat-sim/static/js/monitoring.js` in `jsonData` to load new episodes
7. Launch `http://localhost:8000/hit-monitoring.html?authToken=<auth_toke>&mode=<mode>"
