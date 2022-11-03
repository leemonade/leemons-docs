#!/bin/bash

FILE=./docker-compose.yaml

if [ -x "$(command -v docker)" ]; then
    echo "Docker is installed"
    # command
else
    echo "Please install Docker before continue!"
    exit 0
fi

if [ -f "$FILE" ]; then
  echo "Config files already created."
else
  printf "MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=leemons
MYSQLDB_DATABASE=leemons
MYSQLDB_LOCAL_PORT=3307
NODE_LOCAL_PORT=8080" >> .env

  printf "version: \"3.8\"
services:
  mysqldb:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: \$MYSQLDB_ROOT_PASSWORD
      MYSQL_DATABASE: \$MYSQLDB_DATABASE
    ports:
      - \$MYSQLDB_LOCAL_PORT:3306
    expose:
      - 3306
    volumes:
      - db:/var/lib/mysql
    healthcheck:
      test: mysqladmin ping -h 127.0.0.1 -uroot --password=\$\$MYSQL_ROOT_PASSWORD
      timeout: 10s
      retries: 10

  leemons:
    image: leemonade/leemons:dev
    restart: always
    stdin_open: true
    tty: true
    ports:
      - \$NODE_LOCAL_PORT:8080
    environment:
      DATABASE_HOST: mysqldb
      DATABASE_PORT: 3306
      DATABASE_USERNAME: root
      DATABASE_DATABASE: \$MYSQLDB_DATABASE
      DATABASE_PASSWORD: \$MYSQLDB_ROOT_PASSWORD
    depends_on:
      mysqldb:
        condition: service_healthy

volumes:
  db:
" >> docker-compose.yaml

  printf "docker-compose up" >> launch-leemons.sh
fi

sh launch-leemons.sh
