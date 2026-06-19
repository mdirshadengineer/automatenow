"use client";

import { IconMailPlus } from "@tabler/icons-react";
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
import { useSignUpMutation } from "@/hooks/mutations/use-auth-mutations";
import { signupSchema } from "@/lib/validation";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const signUp = useSignUpMutation();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const parsed = signupSchema({ email, password });
    if (parsed instanceof type.errors) {
      setFieldErrors(
        Object.fromEntries(parsed.map((p) => [p.path.join("."), p.message])),
      );
      return;
    }

    signUp.mutate({ email, password });
  }

  const error = signUp.error instanceof Error ? signUp.error.message : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldContent>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <FieldError>{fieldErrors.password}</FieldError>
            </FieldContent>
          </Field>

          <FieldError>{error}</FieldError>

          <Button type="submit" disabled={signUp.isPending} className="w-full">
            <IconMailPlus className="size-4" />
            {signUp.isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
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
