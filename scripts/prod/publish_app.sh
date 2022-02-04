#!/bin/bash

docker build -t deadbeefio_app ./app

docker save deadbeefio_api > deadbeefio_api.tar
microk8s ctr image import deadbeefio_api.tar
rm ./deadbeefio_api.tar
