#!/bin/bash

export BUILD_TYPE=${1:-staging}
IMAGE_NAME=deadbeefio_app_${BUILD_TYPE}

echo "Building ${IMAGE_NAME}..."

docker build --build-arg BUILD_TYPE=${BUILD_TYPE} -t ${IMAGE_NAME} ./app
docker image tag ${IMAGE_NAME}:latest rloop2:5000/deadbeefio/${IMAGE_NAME}:latest
docker image push rloop2:5000/deadbeefio/${IMAGE_NAME}:latest
