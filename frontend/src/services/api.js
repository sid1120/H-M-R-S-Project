import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://h-m-r-s-project-1.onrender.com/",
});

export default api;
