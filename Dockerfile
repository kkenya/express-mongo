FROM node:10.14.1-slim

RUN apt-get update \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ENV APP_DIR=/home/node/express-mongo

WORKDIR ${APP_DIR}
RUN chown -R node:node ${APP_DIR}

USER node

# COPY package*.json .
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]