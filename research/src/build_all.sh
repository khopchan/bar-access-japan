#!/bin/sh
set -e
cd "$(dirname "$0")"
python3 build_bars.py && python3 build_cocktails.py && python3 build_stories.py && python3 build_sources.py
