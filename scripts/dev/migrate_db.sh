#!/bin/bash

DB_PORT=5432

PG_CLUSTER_USER_SECRET_NAME=hippo-pguser-hippo

export DB_PASSWORD=$(microk8s kubectl get secrets "${PG_CLUSTER_USER_SECRET_NAME}" -o go-template='{{.data.password | base64decode}}')
export DB_USER=$(microk8s kubectl get secrets "${PG_CLUSTER_USER_SECRET_NAME}" -o go-template='{{.data.user | base64decode}}')
export DB_NAME=$(microk8s kubectl get secrets "${PG_CLUSTER_USER_SECRET_NAME}" -o go-template='{{.data.dbname | base64decode}}')
export DB_ADDR=127.0.0.1

cd api
npx prisma migrate dev
