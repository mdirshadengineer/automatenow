import { type } from "arktype";

export function createArkValidator<TFormData extends Record<string, unknown>>(
  schema: (values: TFormData) => TFormData | type.errors,
) {
  return ({
    value,
  }: {
    value: TFormData;
  }): Record<string, string | undefined> | undefined => {
    const result = schema(value);

    if (result instanceof type.errors) {
      return Object.fromEntries(
        result.map((err) => [err.path.join("."), err.message]),
      );
    }

    return undefined;
  };
}
