#!/bin/bash

microk8s kubectl delete ing minimal-ingress
microk8s kubectl delete service frontend-service
microk8s kubectl delete service redis-slave
microk8s kubectl delete service redis-master
microk8s kubectl delete deployment frontend-deployment
microk8s kubectl delete deployment redis-slave-deployment
microk8s kubectl delete deployment redis-master-deployment
