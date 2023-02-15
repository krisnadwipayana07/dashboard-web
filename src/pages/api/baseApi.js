const { default: axios } = require("axios");

const dummyJson = "https://dummyjson.com/";

const client = axios.create({
  baseURL: dummyJson,
});

export default client;
