import { useApi } from "@/composables/useApi";
import { ref } from "vue";
import { type LoginCredentials, type LoginResponse } from "@/types/authTypes";
import { type ValidationErrors } from "@/types/authTypes";

export function useAuthLogin() {
  const validationErrors = ref<ValidationErrors | null>(null);
  const errorMessage = ref<string | null>(null);

  const { execute, onSuccess, onError, ...rest } = useApi<LoginResponse>(
    `/login`,
    { method: "POST" },
    { immediate: false }
  );

  const login = (credentials: LoginCredentials) => {
    return execute({
      data: credentials,
    });
  };

  return {
    ...rest,
    execute: login,
    validationErrors,
    errorMessage,
    onSuccess,
    onError,
  };
}
