#!/bin/bash

export BUILD_TYPE=${1:-staging}
IMAGE_NAME=deadbeefio_app_${BUILD_TYPE}

echo "Building ${IMAGE_NAME}..."

docker build --build-arg BUILD_TYPE=${BUILD_TYPE} -t ${IMAGE_NAME} ./app

docker save ${IMAGE_NAME} > ${IMAGE_NAME}.tar
microk8s ctr image import ${IMAGE_NAME}.tar
rm ./${IMAGE_NAME}.tar
