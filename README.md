# Short URL - Server

Backend server for URL shortening service.

About the server:

- URL shortening service
- Graceful shutdown of server & database
- Security via helmet
- Decoupled backend (Node.js) and frontend (React)
- Server code organized MVC style (Can also be organized component style)

List of packages:

- cors: for front-end / back-end connection
- dotenv: to set environment variables for development.

  ```.env
  NODE_ENV=development
  PORT=5500
  ```

- helmet: to secure against common attacks
