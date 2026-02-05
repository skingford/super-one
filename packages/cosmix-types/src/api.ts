export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface GenerationConfig {
  maxLength: number;
  temperature: number;
  model: string;
}

export interface SystemStatus {
  apiHealth: "healthy" | "degraded" | "down";
  aiQuota: {
    used: number;
    limit: number;
    resetAt: string;
  };
  dailyGenerations: {
    count: number;
    limit: number;
  };
}
