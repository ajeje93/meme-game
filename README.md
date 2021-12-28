# Meme Game

The goal of  the game is to caption a gif to create a meme and then vote the best one.

## Build

To build all apps, run the following command:

```bash
yarn run build
```

## Develop

To develop all apps, run the following command:

```bash
yarn run dev
```

## Environment Variables

You should create a `.env.local` file for each app inside apps. The content of the file for each app is:

* `client`
  * `REACT_APP_SERVER_URL` &rarr; the url of server app (if you are on local machine is `http://localhost:3001` )
* `server`
  * `GIPHY_API_KEY`: a developer key of your [Giphy app](https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key)

## Docker

To start the app with Docker create a file called `.env.server.local` with the content of the `server` app `.env.local` and just run:

```bash
docker-compose up # or "docker compose up" if you are using v2
```
