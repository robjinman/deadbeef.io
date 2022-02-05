#!/bin/bash

user=rob
host=rloop1
dest=/home/rob/deadbeef.io

# TODO: Move ./scripts/dev files to common location

ssh ${user}@${host} mkdir -p ${dest}
scp -r ./kubernetes ${user}@${host}:${dest}/
scp ./scripts/prod/private/deploy_cluster.sh ${user}@${host}:${dest}/
scp ./scripts/dev/delete_local_staging.sh ${user}@${host}:${dest}/
ssh ${user}@${host} "cd ${dest} && chmod +x ./delete_local_staging.sh && ./delete_local_staging.sh"
ssh ${user}@${host} "cd ${dest} && chmod +x ./deploy_cluster.sh && ./deploy_cluster.sh"
