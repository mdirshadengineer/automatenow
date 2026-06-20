"use client";

import { IconAlertOctagon } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAuthErrorMessage } from "@/lib/auth-errors";

type AuthFormErrorProps = {
  error: unknown;
};

export function AuthFormError({ error }: AuthFormErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <IconAlertOctagon />
      <AlertDescription>{getAuthErrorMessage(error)}</AlertDescription>
    </Alert>
  );
}
