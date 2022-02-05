#!/bin/bash

user=rob
host=rloop1
dest=/home/rob/deadbeef.io

ssh ${user}@${host} mkdir -p ${dest}
scp -r ./kubernetes ${user}@${host}:${dest}/
ssh ${user}@${host} "cd ${dest} && microk8s kubectl create -f ./kubernetes/dbadmin.yaml"

echo "On remote machine, open a TTY into the running pod:"
echo
echo "microk8s kubectl exec --stdin --tty \$(microk8s kubectl get pod -l app=deadbeefio-dbadmin -o jsonpath=\"{.items[0].metadata.name}\") -- /bin/sh"
echo
echo "To perform a database migration:"
echo
echo "export DB_PASSWORD=\$(node -p \"encodeURIComponent('\${DB_PASSWORD_RAW}')\")"
echo "npx prisma migrate deploy"
echo
echo "Remember to delete the deployment:"
echo
echo "microk8s kubectl delete deployment deadbeefio-dbadmin-deployment"
