#!/bin/bash

export BUILD_TYPE=staging

microk8s kubectl delete deployment deadbeefio-app-deployment
envsubst < ./kubernetes/app.yaml | microk8s kubectl apply -f -
