ARG NODE_VERSION=23.11.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]