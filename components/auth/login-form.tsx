"use client";

import { useForm } from "@tanstack/react-form";
import { IconMail } from "@tabler/icons-react";
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
import { createArkValidator } from "@/lib/validation-adapters";

export function LoginForm() {
  const signIn = useSignInMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: createArkValidator(loginSchema),
    },
    onSubmit: async ({ value }) => {
      await signIn.mutateAsync(value);
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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

          <form.Field name="password">
            {(field) => (
              <Field key={field.name}>
                <FieldLabel htmlFor={field.name}>
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
                    id={field.name}
                    type="password"
                    placeholder="Enter your password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    name={field.name}
                    required
                    autoComplete="current-password"
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

          <Button
            type="submit"
            disabled={form.state.isSubmitting}
            className="w-full"
          >
            <IconMail className="size-4" />
            {form.state.isSubmitting ? "Signing in..." : "Sign in with email"}
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
