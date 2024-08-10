import { useApi } from "@/composables/useApi";
import { ref } from "vue";
import {
  type RegisterCredentials,
  type RegisterResponse,
} from "@/types/authTypes";

export function useAuthRegister() {
  const errorMessage = ref<string | null>(null);

  const { execute, onSuccess, onError, ...rest } = useApi<RegisterResponse>(
    `/register`,
    { method: "POST" },
    { immediate: false }
  );

  const register = (credentials: RegisterCredentials) => {
    return execute({
      data: credentials,
    });
  };

  return {
    ...rest,
    execute: register,
    errorMessage,
    onSuccess,
    onError,
  };
}
