export interface IDefaultResponse {
  code: number;
  message: string;
  data?: any;
  errors?: any;
}

export interface ISuccessResponse<T> {
  code?: number;
  message: string;
  data: T;
}
