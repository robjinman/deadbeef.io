#!/bin/bash

microk8s kubectl create -f ./kubernetes/postgres.yaml
microk8s kubectl create -f ./kubernetes/api.yaml
microk8s kubectl create -f ./kubernetes/app.yaml
microk8s kubectl create -f ./kubernetes/loadbalancer.yaml
