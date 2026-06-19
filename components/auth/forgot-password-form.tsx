"use client";

import { IconSend } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { AuthFormError } from "@/components/auth/auth-form-error";
import { AuthResendPasswordReset } from "@/components/auth/auth-resend-password-reset";
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
import { useResetPasswordMutation } from "@/hooks/mutations/use-auth-mutations";
import { forgotPasswordSchema } from "@/lib/validation";
import { createArkValidator } from "@/lib/validation-adapters";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const resetPassword = useResetPasswordMutation();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: createArkValidator(forgotPasswordSchema),
    },
    onSubmit: async ({ value }) => {
      try {
        await resetPassword.mutateAsync(value);
        setSent(true);
      } catch {
        // onError already captured in mutation
      }
    },
  });

  const isSubmitting = form.state.isSubmitting || resetPassword.isPending;

  if (sent) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-foreground">
              {form.getFieldValue("email")}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthResendPasswordReset email={form.getFieldValue("email")} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field name="email">
            {(field) => (
              <Field key={field.name}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="name@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    name={field.name}
                    required
                    autoComplete="email"
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

          <AuthFormError error={resetPassword.error} />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <IconSend className="size-4" />
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Remember your password?{" "}
          <a
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
