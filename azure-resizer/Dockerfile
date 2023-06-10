# FROM --platform=linux/arm64 node:19-alpine

# WORKDIR /image-resizer-azure-service

# COPY package*.json ./

# RUN npm install

# RUN npm install -g azure-functions-core-tools@4 --unsafe-perm true

# RUN apk add python3 py3-pip
# RUN apk add --virtual build-dependencies

# RUN npm install -g @grpc/grpc-js

# COPY . .

# RUN npm run build

# RUN apk add bash

# RUN /bin/sh


FROM mcr.microsoft.com/azure-functions/node:4-node18

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    npm install && \
    npm run build