FROM node:16-alpine as build
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL
WORKDIR /usr/src/app
COPY . .
RUN yarn install --frozen-lockfile --prod --silent
RUN yarn run build

FROM nginx:1.21-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]