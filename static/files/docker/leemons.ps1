$FILE="./docker-compose.yaml"

try {
  $OUTPUT=docker --version

  echo "Docker is installed"
}
catch {
  echo "Please install Docker before continue!"
  Pause
  exit 0
}

try {
  $OUTPUT=docker-compose --version

  echo "docker-compose is installed"
} catch {
  echo "Please install docker-compose before continue!"
  Pause
  exit 0
}

if ( Test-Path -Path $FILE -PathType Leaf ) {
  echo "Config files already created."
} else {
@"
MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=leemons
MYSQLDB_DATABASE=leemons
MYSQLDB_LOCAL_PORT=3307
NODE_LOCAL_PORT=8080
"@ |  Out-File -FilePath ".env" -Encoding ASCII


@"
version: "3.8"
services:
  mysqldb:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: `$MYSQLDB_ROOT_PASSWORD
      MYSQL_DATABASE: `$MYSQLDB_DATABASE
    ports:
      - `$MYSQLDB_LOCAL_PORT:3306
    expose:
      - 3306
    volumes:
      - db:/var/lib/mysql
    healthcheck:
      test: mysqladmin ping -h 127.0.0.1 -uroot --password=$`$MYSQL_ROOT_PASSWORD
      timeout: 10s
      retries: 10

  leemons:
    image: leemonade/leemons:dev
    restart: always
    stdin_open: true
    tty: true
    ports:
      - `$NODE_LOCAL_PORT:8080
    environment:
      DATABASE_HOST: mysqldb
      DATABASE_PORT: 3306
      DATABASE_USERNAME: root
      DATABASE_DATABASE: `$MYSQLDB_DATABASE
      DATABASE_PASSWORD: `$MYSQLDB_ROOT_PASSWORD
    depends_on:
      mysqldb:
        condition: service_healthy
volumes:
  db:
"@ | Out-File -FilePath $FILE -Encoding ASCII

  "docker-compose up" | Out-File -FilePath launch-leemons.ps1 -Encoding ASCII
}

.("./launch-leemons.ps1")

Pause
