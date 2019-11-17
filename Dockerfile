FROM node:alpine

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json package-lock.json /usr/src/bot/
RUN npm install 

COPY ./src /usr/src/bot

CMD ["node", "entry.js"]