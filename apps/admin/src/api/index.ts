import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Example API methods
export const api = {
  // Auth
  login: (data: { username: string; password: string }) => instance.post("/auth/login", data),

  logout: () => instance.post("/auth/logout"),

  // Users
  getUsers: (params?: { page?: number; pageSize?: number }) => instance.get("/users", { params }),

  createUser: (data: { name: string; email: string; role: string }) =>
    instance.post("/users", data),

  updateUser: (id: number, data: { name?: string; email?: string; role?: string }) =>
    instance.put(`/users/${id}`, data),

  deleteUser: (id: number) => instance.delete(`/users/${id}`),

  // Content
  getContents: (params?: { page?: number; pageSize?: number; type?: string }) =>
    instance.get("/contents", { params }),

  createContent: (data: { title: string; type: string; content: string }) =>
    instance.post("/contents", data),

  updateContent: (id: number, data: { title?: string; content?: string; status?: string }) =>
    instance.put(`/contents/${id}`, data),

  deleteContent: (id: number) => instance.delete(`/contents/${id}`),
};

export default instance;
