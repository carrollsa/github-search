FROM ubuntu:focal

RUN apt update
RUN apt upgrade
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs

WORKDIR /app

COPY .node-version .node-version
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
COPY ./src ./src
COPY ./public ./public
COPY .env .env
RUN npm run build
ENTRYPOINT ["npm","run","start"]
EXPOSE 3000