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

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config?.url?.includes("/auth/login");
      const isLoginPage = typeof window !== "undefined" && window.location.pathname.includes("/pages/auth/login");

      if (!isLoginRequest && !isLoginPage) {
        console.warn("🚫 apiClient: Sesi kedaluwarsa (401). Menghapus token...");
        Cookies.remove("access_token", { path: "/" });
        if (typeof window !== "undefined") {
          localStorage.setItem("logout-event", Date.now().toString());
          sessionStorage.removeItem("session_active");
          window.location.href = "/pages/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
