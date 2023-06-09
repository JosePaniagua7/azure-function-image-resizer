FROM node:lts-alpine

WORKDIR /image-resizer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "node", "dist/server.js" ]
