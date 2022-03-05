#!/bin/sh

cd `dirname $0`
cd ..
poetry run flake8 script tests
poetry run black script tests
poetry run pytest -v script tests
