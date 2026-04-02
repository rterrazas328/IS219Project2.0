#!/bin/bash

set -e

export DB_USER=`cat /run/secrets/db_user`
export DB_PASSWORD=`cat /run/secrets/db_password`

exec "$@"