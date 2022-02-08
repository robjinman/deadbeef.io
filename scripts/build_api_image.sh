#!/bin/bash

docker build -t deadbeefio_api ./api
docker image tag deadbeefio_api:latest rloop2:5000/deadbeefio/deadbeefio_api:latest
docker image push rloop2:5000/deadbeefio/deadbeefio_api:latest
