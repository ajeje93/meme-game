FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --frozen-lockfile --prod --silent

COPY . .

EXPOSE 3001
CMD [ "yarn", "start" ]