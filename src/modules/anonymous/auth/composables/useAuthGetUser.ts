import { useApi } from "@/composables/useApi";
import { ref } from "vue";
import { type ValidationErrors } from "@/types/authTypes";
import { type UserResponse } from "@/types/authTypes";
export function useAuthGetUser() {
  const validationErrors = ref<ValidationErrors | null>(null);
  const errorMessage = ref<string | null>(null);

  const { execute, onSuccess, onError, ...rest } = useApi<UserResponse>(
    `/api/user`,
    { method: "GET" },
    { immediate: false }
  );

  const getUser = () => {
    return execute();
  };

  return {
    ...rest,
    execute: getUser,
    validationErrors,
    errorMessage,
    onSuccess,
    onError,
  };
}
