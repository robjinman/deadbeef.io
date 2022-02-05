#!/bin/bash

export BUILD_TYPE=production

microk8s kubectl delete ing minimal-ingress
microk8s kubectl delete service deadbeefio-app-service
microk8s kubectl delete deployment deadbeefio-app-deployment
microk8s kubectl delete service deadbeefio-api-service
microk8s kubectl delete deployment deadbeefio-api-deployment

microk8s kubectl create -f ./kubernetes/api.yaml
envsubst < ./kubernetes/app.yaml | microk8s kubectl apply -f -
microk8s kubectl create -f ./kubernetes/loadbalancer.yaml
