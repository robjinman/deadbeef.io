#!/bin/bash

PG_CLUSTER_USER_SECRET_NAME=hippo-pguser-hippo

export DB_ADDR=localhost
export DB_PORT=5432
export DB_NAME=$(microk8s kubectl get secrets "${PG_CLUSTER_USER_SECRET_NAME}" -o go-template='{{.data.dbname | base64decode}}')
export DB_USER=$(microk8s kubectl get secrets "${PG_CLUSTER_USER_SECRET_NAME}" -o go-template='{{.data.user | base64decode}}')
DB_PASSWORD_RAW=$(microk8s kubectl get secrets "${PG_CLUSTER_USER_SECRET_NAME}" -o go-template='{{.data.password | base64decode}}')
export DB_PASSWORD=$(node -p "encodeURIComponent('${DB_PASSWORD_RAW}')")
