"use client";

import { IconLock } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";
import { AuthFormError } from "@/components/auth/auth-form-error";
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from "@/components/auth/turnstile-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdatePasswordMutation } from "@/hooks/mutations/use-auth-mutations";
import { updatePasswordSchema } from "@/lib/validation";
import { createArkValidator } from "@/lib/validation-adapters";

export function UpdatePasswordForm() {
  const updatePassword = useUpdatePasswordMutation();
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: createArkValidator(updatePasswordSchema, {
        form: "update_password",
      }),
    },
    onSubmit: async ({ value }) => {
      if (!turnstileToken) {
        return;
      }

      try {
        await updatePassword.mutateAsync({ ...value, turnstileToken });
      } catch {
        turnstileRef.current?.reset();
      }
    },
  });

  const isSubmitting = form.state.isSubmitting || updatePassword.isPending;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field name="password">
            {(field) => (
              <Field key={field.name}>
                <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="Enter your new password"
                    className="ph-no-capture"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    name={field.name}
                    required
                    autoComplete="new-password"
                  />
                  <FieldError
                    errors={field.state.meta.errors.map((e) => ({
                      message: e,
                    }))}
                  />
                </FieldContent>
              </Field>
            )}
          </form.Field>

          <AuthFormError error={updatePassword.error} />

          <TurnstileField
            ref={turnstileRef}
            form="update_password"
            onTokenChange={setTurnstileToken}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            className="w-full"
          >
            <IconLock className="size-4" />
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
