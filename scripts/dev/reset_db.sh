#!/bin/bash

source scripts/dev/private/db_credentials.sh
cd api && npx prisma migrate reset
