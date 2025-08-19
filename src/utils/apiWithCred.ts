import axios from "axios";

const api = axios.create({
  baseURL: "https://api.nuttyvibes.com",
  withCredentials: true, // 🔑 send cookies with requests
});

export default api;
