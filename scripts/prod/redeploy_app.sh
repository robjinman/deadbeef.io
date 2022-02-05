#!/bin/bash

user=rob
host=rloop1
dest=/home/rob/deadbeef.io

ssh ${user}@${host} mkdir -p ${dest}
scp -r ./kubernetes ${user}@${host}:${dest}/
scp ./scripts/prod/private/redeploy_app.sh ${user}@${host}:${dest}/
ssh ${user}@${host} "cd ${dest} && chmod +x ./redeploy_app.sh && ./redeploy_app.sh"
