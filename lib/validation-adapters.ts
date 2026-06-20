import { type } from "arktype";
import { captureFormValidationFailed } from "@/lib/posthog/client";
import type { AuthFormName } from "@/lib/posthog/events";

export function createArkValidator<TFormData extends Record<string, unknown>>(
  schema: (values: TFormData) => TFormData | type.errors,
  options?: { form?: AuthFormName },
) {
  return ({
    value,
  }: {
    value: TFormData;
  }): Record<string, string | undefined> | undefined => {
    const result = schema(value);

    if (result instanceof type.errors) {
      const fieldErrors = Object.fromEntries(
        result.map((err) => [err.path.join("."), err.message]),
      );

      if (options?.form) {
        captureFormValidationFailed(
          options.form,
          Object.keys(fieldErrors).filter(Boolean),
        );
      }

      return fieldErrors;
    }

    return undefined;
  };
}
