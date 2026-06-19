"use client";

import { IconMailPlus } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { AuthFormError } from "@/components/auth/auth-form-error";
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
import { signupFormSchema } from "@/lib/validation";
import { createArkValidator } from "@/lib/validation-adapters";

export function SignupForm() {
  const signUp = useSignUpMutation();

  const handleFieldChange = (
    onChange: (value: string) => void,
    value: string,
  ) => {
    onChange(value);
    if (signUp.isError) {
      signUp.reset();
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: createArkValidator(signupFormSchema),
    },
    onSubmit: async ({ value }) => {
      try {
        await signUp.mutateAsync({
          email: value.email,
          password: value.password,
        });
      } catch {
        // onError already shows toast
      }
    },
  });

  const isSubmitting = form.state.isSubmitting || signUp.isPending;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
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
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="Create a password"
                    value={field.state.value}
                    onChange={(e) =>
                      handleFieldChange(field.handleChange, e.target.value)
                    }
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

          <form.Field name="confirmPassword">
            {(field) => (
              <Field key={field.name}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="Repeat your password"
                    value={field.state.value}
                    onChange={(e) =>
                      handleFieldChange(field.handleChange, e.target.value)
                    }
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

          <AuthFormError error={signUp.error} />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <IconMailPlus className="size-4" />
            {isSubmitting ? "Creating account..." : "Create account"}
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
