#!/bin/bash

DB_PORT=5432
PG_CLUSTER_PRIMARY_POD=$(microk8s kubectl get pod -o name \
-l postgres-operator.crunchydata.com/cluster=hippo,postgres-operator.crunchydata.com/role=master)
microk8s kubectl port-forward "${PG_CLUSTER_PRIMARY_POD}" ${DB_PORT}:${DB_PORT}
