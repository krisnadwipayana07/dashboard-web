const { default: axios } = require("axios");

const dummyJson = process.env.NEXT_PUBLIC_BASE_URL;

const client = axios.create({
  baseURL: dummyJson,
});

export default client;
