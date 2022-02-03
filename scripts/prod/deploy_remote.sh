#!/bin/bash

user=rob
host=rloop1

ssh ${user}@${host} mkdir -p /home/rob/deadbeef.io
scp -r ./kubernetes ${user}@${host}:/home/rob/deadbeef.io/
