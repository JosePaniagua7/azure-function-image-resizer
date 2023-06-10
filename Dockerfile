FROM node:lts-alpine

WORKDIR /api

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "node", "dist/server.js" ]
