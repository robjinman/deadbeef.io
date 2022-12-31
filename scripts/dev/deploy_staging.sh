#!/bin/bash

export BUILD_TYPE=staging

microk8s kubectl create -f ./kubernetes/postgres.yaml
microk8s kubectl create -f ./kubernetes/api.yaml
envsubst < ./kubernetes/app.yaml | microk8s kubectl apply -f -
microk8s kubectl create -f ./kubernetes/dev/loadbalancer.yaml
