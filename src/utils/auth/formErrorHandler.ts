import { type ValidationErrors } from "@/types/authTypes";

export function transformValidationErrors(
  serverErrors: ValidationErrors
): Record<string, string> {
  return Object.entries(serverErrors).reduce((acc, [field, messages]) => {
    acc[field] = Array.isArray(messages) ? messages[0] : messages;
    return acc;
  }, {} as Record<string, string>);
}
