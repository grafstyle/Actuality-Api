FROM node:16-alpine3.11

RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

RUN mkdir -p /api

WORKDIR  /api

COPY . .

RUN npm install --force

EXPOSE 3500


CMD [ "npm", "run", "serve" ]