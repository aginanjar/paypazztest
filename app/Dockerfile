FROM node:8.15.0-alpine

RUN npm install -g nodemon --no-optional

ADD ./index.js /usr/src/
ADD ./package.json /usr/src/
WORKDIR /usr/src/

RUN npm install

EXPOSE 3000