import axios from "axios";

const postsAPI = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export default postsAPI;
