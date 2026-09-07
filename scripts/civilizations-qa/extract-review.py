#!/usr/bin/env python3
"""Extract QA screenshots/summaries from `gh run view RUN_ID --log` output."""
import argparse
import base64
import json
from pathlib import Path
import re

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('log', type=Path)
parser.add_argument('output', type=Path)
args = parser.parse_args()
root = args.output.resolve()
root.mkdir(parents=True, exist_ok=True)
name, chunks = None, []


def destination(name):
    path = (root / name).resolve()
    if not path.is_relative_to(root):
        raise ValueError('Unsafe review path')
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


for line in args.log.read_text().splitlines():
    summary = re.search(r'CIV_SUMMARY (\{.*\})$', line)
    begin = re.search(r'CIV_REVIEW_BEGIN ([\w/.-]+)$', line)
    data = re.search(r'CIV_REVIEW_DATA ([A-Za-z0-9+/=]+)$', line)
    if summary:
        report = json.loads(summary[1])
        destination(report['engine'] + '/summary.json').write_text(json.dumps(report, indent=2) + '\n')
    elif begin:
        name, chunks = begin[1], []
    elif data and name:
        chunks.append(data[1])
    elif 'CIV_REVIEW_END' in line and name:
        target = destination(name)
        target.write_bytes(base64.b64decode(''.join(chunks), validate=True))
        print(target)
        name, chunks = None, []
