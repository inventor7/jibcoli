// src/utils/createApiInstance.ts
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import { useCookies } from "@vueuse/integrations/useCookies";

export function createApiInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    timeout: 10000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // If we don't have the token, request it

      const xsrfToken = useCookies().get("XSRF-TOKEN");
      if (!xsrfToken) {
        await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`
        );
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle global errors here if needed
      // For example, you could handle 401 errors and trigger a token refresh
      if (error.response && error.response.status === 401) {
        // Trigger token refresh or redirect to login
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
