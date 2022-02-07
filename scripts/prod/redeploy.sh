#!/bin/bash

#if [[ -z "$1" ]]; then
#  echo "Please provide webmaster email address. Aborting."
#  exit 1
#fi

user=rob
host=rloop1
dest=/home/rob/deadbeef.io
#webmaster_email="$1"

ssh ${user}@${host} mkdir -p ${dest}
scp -r ./kubernetes ${user}@${host}:${dest}/
scp ./scripts/prod/private/redeploy.sh ${user}@${host}:${dest}/
#ssh ${user}@${host} "cd ${dest} && chmod +x ./redeploy.sh && ./redeploy.sh '${webmaster_email}'"
ssh ${user}@${host} "cd ${dest} && chmod +x ./redeploy.sh && ./redeploy.sh"
