"use client";

import { IconLock } from "@tabler/icons-react";
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
import { useUpdatePasswordMutation } from "@/hooks/mutations/use-auth-mutations";
import { updatePasswordSchema } from "@/lib/validation";

export function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const updatePassword = useUpdatePasswordMutation();

  function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const parsed = updatePasswordSchema({ password });
    if (parsed instanceof type.errors) {
      setFieldErrors(
        Object.fromEntries(parsed.map((p) => [p.path.join("."), p.message])),
      );
      return;
    }

    updatePassword.mutate({ password });
  }

  const error =
    updatePassword.error instanceof Error ? updatePassword.error.message : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="password">New password</FieldLabel>
            <FieldContent>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <FieldError>{fieldErrors.password}</FieldError>
            </FieldContent>
          </Field>

          <FieldError>{error}</FieldError>

          <Button
            type="submit"
            disabled={updatePassword.isPending}
            className="w-full"
          >
            <IconLock className="size-4" />
            {updatePassword.isPending ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
