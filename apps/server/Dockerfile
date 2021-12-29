FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --production --ignore-scripts --prefer-offline

COPY . .

EXPOSE 3001
CMD [ "yarn", "start" ]