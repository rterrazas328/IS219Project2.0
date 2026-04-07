FROM mongo:8.2.3 AS build

EXPOSE 27017

COPY backup/ /backup
COPY entrypoint.sh /docker-entrypoint-initdb.d/entrypoint.sh
RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh
