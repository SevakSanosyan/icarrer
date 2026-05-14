import axios from "axios";

const api = axios.create({
  baseURL: "https://icarrer.onrender.com",
});

export default api;