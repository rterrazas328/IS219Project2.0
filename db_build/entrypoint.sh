#!/bin/bash


set -e


# Wait for Mongo to be ready
echo "Waiting for MongoDB to start..."
until mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  sleep 2
done

echo "MongoDB started."

# Restore database if backup exists
if [ -d "/backup/dump" ]; then
  echo "Restoring database from backup..."
  mongorestore --uri="mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017" --drop /backup/dump

  echo "Restore complete."
else
  echo "No backup found, skipping restore."
fi

