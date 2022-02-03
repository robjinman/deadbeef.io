#!/bin/bash

docker build -t deadbeefio_app ./app

docker save deadbeefio_app > deadbeefio_app.tar
microk8s ctr image import deadbeefio_app.tar
rm ./deadbeefio_app.tar
