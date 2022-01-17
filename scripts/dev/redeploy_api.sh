#!/bin/bash

microk8s kubectl delete deployment deadbeefio-api-deployment
microk8s kubectl create -f ./kubernetes/api.yaml
