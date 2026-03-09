export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
};
