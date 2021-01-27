# Short URL - Server

Backend server for URL shortening service.

## About the server

- URL shortening service
- Graceful shutdown of server & database
- Security via helmet
- Decoupled backend (Node.js) and frontend (React)
- Server code organized MVC style (Can also be organized component style)

## List of packages

- cors: for front-end / back-end connection
- dotenv: to set environment variables for development.

  ```.env
  NODE_ENV=development
  PORT=5500
  DB_ADDRESS=mongodb://localhost/
  DB_NAME=short-urls
  DB_USER=default
  DB_PASS=hunter2
  ```

- helmet: to secure against common attacks
- mongoose: to connect to mongodb

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
