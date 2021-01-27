# Short URL - Server

Backend server for URL shortening service.

## About the server

- URL shortening service
- Uses free-tier mongodb atlas
- Graceful shutdown of server & database
- Security via helmet
- Decoupled backend (Node.js) and frontend (React)
- Server code organized MVC style (Can also be organized component style)

## .evn Settings

- dotenv: to set environment variables for development.\
  *(env variables with production settings should be setup as well)*

  ```.env
  NODE_ENV=development
  PORT=5500
  DB_ADDRESS=mongodb://localhost/
  DB_NAME=short-urls
  DB_USER=default
  DB_PASS=hunter2
  ```

## MongoDB Test Instance

If you have docker installed, save the following file as **docker-compose.yml**.

```yml
version: "3.1"
services:
  mongo:
    image: mongo
    restart: always
    container_name: "my_mongodb"
    environment:
      MONGO_INITDB_ROOT_USERNAME: default
      MONGO_INITDB_ROOT_PASSWORD: hunter2
    ports:
      - "27017:27017"
    volumes:
      - ./mongodb-data:/data/db
volumes:
  mongodb-data:
```

Then you can run the mongodb server for testing using the following command in the directory with **docker-compose.yml**:

```bash
$ docker-compose up -d
// service running (silent mode)
```

## Deploying Container to Heroku

Use the following steps to deploy the container to Heroku (after creating app & setting production environment variables):

1. Push the Docker Image to the heroku registry: `heroku container:push web -a short--urls`
2. Release the image: `heroku container:release web -a short--urls`
3. Check the logs: `heroku logs --tail -a short--urls`
