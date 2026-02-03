import { createAlova } from "alova";
import VueHook from "alova/vue";
import adapterFetch from "alova/fetch";
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  Content,
  LoginParams,
  CreateUserParams,
  UpdateUserParams,
  CreateContentParams,
  UpdateContentParams,
  PaginationParams,
  ContentListParams,
} from "#types/api";

export const alovaInstance = createAlova({
  baseURL: "/api",
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  timeout: 10000,
  beforeRequest(method) {
    const token = localStorage.getItem("token");
    if (token) {
      method.config.headers.Authorization = `Bearer ${token}`;
    }
  },
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      return json;
    },
    onError: (error) => {
      console.error("API Error:", error);
      throw error;
    },
  },
});

export const api = {
  login: (data: LoginParams) =>
    alovaInstance.Post<ApiResponse<{ token: string }>>("/auth/login", data),

  logout: () => alovaInstance.Post<ApiResponse<null>>("/auth/logout"),

  getUsers: (params?: PaginationParams) =>
    alovaInstance.Get<PaginatedResponse<User>>("/users", { params }),

  createUser: (data: CreateUserParams) => alovaInstance.Post<ApiResponse<User>>("/users", data),

  updateUser: (id: number, data: UpdateUserParams) =>
    alovaInstance.Put<ApiResponse<User>>(`/users/${id}`, data),

  deleteUser: (id: number) => alovaInstance.Delete<ApiResponse<null>>(`/users/${id}`),

  getContents: (params?: ContentListParams) =>
    alovaInstance.Get<PaginatedResponse<Content>>("/contents", { params }),

  createContent: (data: CreateContentParams) =>
    alovaInstance.Post<ApiResponse<Content>>("/contents", data),

  updateContent: (id: number, data: UpdateContentParams) =>
    alovaInstance.Put<ApiResponse<Content>>(`/contents/${id}`, data),

  deleteContent: (id: number) => alovaInstance.Delete<ApiResponse<null>>(`/contents/${id}`),
};

export default alovaInstance;
