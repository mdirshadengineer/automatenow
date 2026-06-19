"use client";

import { IconMail } from "@tabler/icons-react";
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
import { useSignInMutation } from "@/hooks/mutations/use-auth-mutations";
import { loginSchema } from "@/lib/validation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const signIn = useSignInMutation();

  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const parsed = loginSchema({ email, password });
    if (parsed instanceof type.errors) {
      setFieldErrors(
        Object.fromEntries(parsed.map((p) => [p.path.join("."), p.message])),
      );
      return;
    }

    signIn.mutate({ email, password });
  }

  const error = signIn.error instanceof Error ? signIn.error.message : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
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

          <Field>
            <FieldLabel htmlFor="password">
              <span>Password</span>
              <a
                href="/forgot-password"
                className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </FieldLabel>
            <FieldContent>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <FieldError>{fieldErrors.password}</FieldError>
            </FieldContent>
          </Field>

          <FieldError>{error}</FieldError>

          <Button type="submit" disabled={signIn.isPending} className="w-full">
            <IconMail className="size-4" />
            {signIn.isPending ? "Signing in..." : "Sign in with email"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
