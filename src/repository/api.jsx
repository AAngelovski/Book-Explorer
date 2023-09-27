import axios from "axios";

const api = axios.create({
  baseURL: "https://www.googleapis.com/books",
  timeout: 10000,
});

export default api;
