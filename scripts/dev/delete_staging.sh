#!/bin/bash

microk8s kubectl delete ing minimal-ingress
microk8s kubectl delete service deadbeefio-app-service
microk8s kubectl delete deployment deadbeefio-app-deployment
microk8s kubectl delete service deadbeefio-api-service
microk8s kubectl delete deployment deadbeefio-api-deployment
microk8s kubectl delete postgresCluster hippo
