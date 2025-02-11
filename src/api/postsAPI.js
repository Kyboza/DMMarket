import axios from "axios";

const API_URL_BASE = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/api";

const postsAPI = axios.create({
  baseURL: API_URL_BASE,
  withCredentials: true
});

export default postsAPI;

