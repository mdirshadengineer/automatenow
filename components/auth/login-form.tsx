"use client";

import { IconMail } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { AuthFormError } from "@/components/auth/auth-form-error";
import { AuthResendConfirmation } from "@/components/auth/auth-resend-confirmation";
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
import { isEmailNotConfirmedError } from "@/lib/auth-errors";
import { loginSchema } from "@/lib/validation";
import { createArkValidator } from "@/lib/validation-adapters";

export function LoginForm() {
  const signIn = useSignInMutation();

  const handleFieldChange = (
    onChange: (value: string) => void,
    value: string,
  ) => {
    onChange(value);
    if (signIn.isError) {
      signIn.reset();
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: createArkValidator(loginSchema),
    },
    onSubmit: async ({ value }) => {
      try {
        await signIn.mutateAsync(value);
      } catch {
        // onError already shows toast
      }
    },
  });

  const isSubmitting = form.state.isSubmitting || signIn.isPending;
  const showResendConfirmation =
    signIn.error && isEmailNotConfirmedError(signIn.error);

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
                    onChange={(e) =>
                      handleFieldChange(field.handleChange, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFieldChange(field.handleChange, e.target.value)
                    }
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

          <AuthFormError error={signIn.error} />

          {showResendConfirmation ? (
            <AuthResendConfirmation email={form.getFieldValue("email")} />
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <IconMail className="size-4" />
            {isSubmitting ? "Signing in..." : "Sign in with email"}
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
