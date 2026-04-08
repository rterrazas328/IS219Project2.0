#!/bin/bash

set -e

if [[ -v "$RAILWAY_SERVICE_ID" ]]; then

else
    export DB_USER=$(cat /run/secrets/db_user)
    export DB_PASSWORD=$(cat /run/secrets/db_password)
fi


exec "$@"