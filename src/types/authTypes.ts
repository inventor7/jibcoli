//Login
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

//Register
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export type ApiSuccessResponse<T> = {
  data: T;
  message?: string;
};

export type ValidationErrors = {
  [key: string]: string[];
};

export type ApiErrorResponse = {
  message: string;
  errors?: ValidationErrors;
  status?: number;
  [x: string]: any;
};

export class ApiError extends Error {
  errors?: ValidationErrors;
  status?: number;

  constructor(message: string, errors?: ValidationErrors, status?: number) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.status = status;
  }
}

//User Response laravel breeze api
export interface UserResponse {
  id: number;
  name: string;
  email: string;
}
