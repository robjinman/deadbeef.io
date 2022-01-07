#!/bin/bash

microk8s kubectl create -f redis_master.yaml
microk8s kubectl create -f redis_slave.yaml
microk8s kubectl create -f frontend.yaml
microk8s kubectl create -f loadbalancer.yaml
