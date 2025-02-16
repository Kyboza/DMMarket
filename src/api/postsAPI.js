import axios from "axios";

const API_URL_BASE = "/api";

const postsAPI = axios.create({
  baseURL: API_URL_BASE,
  withCredentials: true
});

export default postsAPI;

