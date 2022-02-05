#!/bin/bash

export BUILD_TYPE=production

microk8s kubectl create -f ./kubernetes/postgres.yaml
microk8s kubectl create -f ./kubernetes/api.yaml
envsubst < ./kubernetes/app.yaml | microk8s kubectl apply -f -
microk8s kubectl create -f ./kubernetes/loadbalancer.yaml
