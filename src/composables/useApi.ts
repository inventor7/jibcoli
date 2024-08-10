import { type RawAxiosRequestConfig } from "axios";
import { useAxios, type UseAxiosOptions } from "@vueuse/integrations/useAxios";
import { createEventHook, whenever } from "@vueuse/core";
import {
  ApiError,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from "@/types/authTypes";
import { createApiInstance } from "@/utils/auth/createApiInstance";
import { getHttpErrorMessage } from "@/utils/auth/useErrorMessage";

// Types for API responses and errors

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function useApi<T>(
  path: string = "",
  config: RawAxiosRequestConfig<any> = {},
  options: UseAxiosOptions & { initialData?: any } = {
    immediate: true,
    shallow: true,
    initialData: undefined,
  }
) {
  const instance = createApiInstance();
  const query = useAxios<ApiResponse<T>>(path, config, instance, options);

  const onSuccessHook = createEventHook<T>();
  const onErrorHook = createEventHook<ApiError>();

  whenever(query.isFinished, () => {
    if (query.error.value) {
      // If there is an error in the response
      const apiError = new ApiError(
        (query.error.value as ApiErrorResponse).message,
        (query.error.value as ApiErrorResponse)?.response?.data?.errors,
        (query.error.value as ApiErrorResponse)?.response?.status
      );
      onErrorHook.trigger(apiError);
    } else if (query.data.value) {
      // If there is no error in the response
      const response = query.data.value;
      if ("errors" in response || "status" in response) {
        // If there is an error in the response data (all the time)
        const apiError = new ApiError(
          (response as ApiErrorResponse).message,
          (response as ApiErrorResponse).errors,
          (response as ApiErrorResponse).status
        );
        onErrorHook.trigger(apiError);
      } else {
        // If there is no error in the response data
        onSuccessHook.trigger(response.data);
      }
    } else {
      // If there is no error in the response and no data
      switch (query.response.value?.status) {
        case 204:
          onSuccessHook.trigger(undefined);
          break;
        case 302:
        case 401:
        case 403:
        case 404:
        case 419:
        case 422:
        case 500:
          onErrorHook.trigger(
            new ApiError(
              getHttpErrorMessage(query.response.value?.status),
              undefined,
              query.response.value?.status
            )
          );
          break;
        default:
          onErrorHook.trigger(new ApiError("Unknown Error", undefined, 0));
          break;
      }
    }
  });

  return {
    ...query,
    onSuccess: onSuccessHook.on,
    onError: onErrorHook.on,
  };
}
