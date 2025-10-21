import axios from "axios";

const API_URL =
  import.meta.env.MODE === "production"
    ? "https://best-trust-b5c8149993.strapiapp.com/api"
    : "http://localhost:1337/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
