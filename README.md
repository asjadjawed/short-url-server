# Short URL - Server

Backend server for URL shortening service.

## About the server

- URL shortening service
- Uses free-tier mongodb atlas
- Graceful shutdown of server & database
- Security via helmet
- Decoupled backend (Node.js) and frontend (React)
- Server code organized MVC style (Can also be organized component style)

## .env Settings

- dotenv: to set environment variables for development.\
  *(env variables with production settings should be setup as well)*

  ```.env
  NODE_ENV=development
  PORT=5500
  DB_CONNECTION=mongodb://localhost:27017/short-urls
  ```

## Deploying Container to Heroku

Use the following steps to deploy the container to Heroku (after creating app & setting production environment variables):

1. Push the Docker Image to the heroku registry: `heroku container:push web -a short--urls`
2. Release the image: `heroku container:release web -a short--urls`
3. Check the logs: `heroku logs --tail -a short--urls`
