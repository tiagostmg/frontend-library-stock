// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// INTERCEPTOR DE REQUEST
api.interceptors.request.use((config) => {
  // Não envia token no login
  if (config.url?.includes("/auth/login")) {
    return config;
  }

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // redireciona para login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
    }

    return Promise.reject(error);
  }
);
