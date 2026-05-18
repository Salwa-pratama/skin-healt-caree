import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1915/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    console.log("Isi token : ", token)
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.warn("⚠️ apiClient: No access_token found in cookies");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
