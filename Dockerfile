# Thanks Sean Cale (GitHub.com/iComputer7) for this contribution!

FROM node:alpine

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install 

COPY . /usr/src/bot

CMD ["node", "entry.js"]

EXPOSE 80 443
