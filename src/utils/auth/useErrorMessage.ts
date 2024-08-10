export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  302: "Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  419: "Page Expired",
  422: "Validation Error",
  500: "Internal Server Error",
};

export const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

export function getHttpErrorMessage(status: number): string {
  return HTTP_ERROR_MESSAGES[status] || DEFAULT_ERROR_MESSAGE;
}

export const API_ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Validation failed. Please check your input.",
  AUTH_ERROR: "Authentication failed. Please log in again.",
};

export function getApiErrorMessage(errorType: string): string {
  return API_ERROR_MESSAGES[errorType] || DEFAULT_ERROR_MESSAGE;
}
