import { default as axios } from "axios";

export const getRandomGif = async () => {
  const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    apiKey: process.env.GIPHY_API_KEY,
    type: "random",
  };
  const giphyURL = encodeURI(
    giphy.baseURL + giphy.type + "?api_key=" + giphy.apiKey
  );

  return (
    (await axios.get(giphyURL)).data?.data?.images?.original?.url ||
    (await getRandomGif())
  );
};
