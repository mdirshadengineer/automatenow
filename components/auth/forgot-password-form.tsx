"use client";

import { IconSend } from "@tabler/icons-react";
import { type } from "arktype";
import { useState } from "react";
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

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const resetPassword = useResetPasswordMutation();

  function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const parsed = forgotPasswordSchema({ email });
    if (parsed instanceof type.errors) {
      setFieldErrors(
        Object.fromEntries(parsed.map((p) => [p.path.join("."), p.message])),
      );
      return;
    }

    resetPassword.mutate(
      { email },
      {
        onSuccess: () => {
          setSent(true);
        },
      },
    );
  }

  const error =
    resetPassword.error instanceof Error ? resetPassword.error.message : null;

  if (sent) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSent(false);
              resetPassword.reset();
            }}
          >
            Send again
          </Button>
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
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <FieldError>{fieldErrors.email}</FieldError>
            </FieldContent>
          </Field>

          <FieldError>{error}</FieldError>

          <Button
            type="submit"
            disabled={resetPassword.isPending}
            className="w-full"
          >
            <IconSend className="size-4" />
            {resetPassword.isPending ? "Sending link..." : "Send reset link"}
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
