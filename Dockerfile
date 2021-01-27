# For production server
FROM node:alpine

WORKDIR '/usr/src/short-url'

COPY package.json .
RUN yarn install
COPY . .

CMD ["node", "src/server.js"]
