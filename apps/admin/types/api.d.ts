export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
}

export interface Content {
  id: number;
  title: string;
  type: "article" | "page";
  author: string;
  status: "published" | "draft" | "review";
  date: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserParams {
  name?: string;
  email?: string;
  role?: string;
}

export interface CreateContentParams {
  title: string;
  type: string;
  content: string;
}

export interface UpdateContentParams {
  title?: string;
  content?: string;
  status?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface ContentListParams extends PaginationParams {
  type?: string;
}
