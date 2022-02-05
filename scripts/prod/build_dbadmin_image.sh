#!/bin/bash

docker build -t deadbeefio_dbadmin -f ./api/dbadmin.Dockerfile ./api
docker image tag deadbeefio_dbadmin:latest rloop2:5000/deadbeefio/deadbeefio_dbadmin:latest
docker image push rloop2:5000/deadbeefio/deadbeefio_dbadmin:latest
