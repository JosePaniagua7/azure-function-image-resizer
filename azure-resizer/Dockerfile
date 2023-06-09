FROM node:hydrogen-alpine3.18

WORKDIR /image-resizer-azure-service

COPY package*.json ./

RUN npm install

RUN npm install -g azure-functions-core-tools@3 --unsafe-perm true

COPY . .

RUN npm run build