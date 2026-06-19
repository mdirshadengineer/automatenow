"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useResendConfirmationMutation } from "@/hooks/mutations/use-auth-mutations";
import {
  isEmailRateLimitError,
  RESEND_CONFIRMATION_COOLDOWN_SECONDS,
} from "@/lib/auth-errors";

type AuthResendConfirmationProps = {
  email: string;
};

export function AuthResendConfirmation({ email }: AuthResendConfirmationProps) {
  const resendConfirmation = useResendConfirmationMutation();
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCooldownSeconds((seconds) => (seconds <= 1 ? 0 : seconds - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const canResend = cooldownSeconds === 0;

  function startResendCooldown() {
    setCooldownSeconds(RESEND_CONFIRMATION_COOLDOWN_SECONDS);
  }

  function handleResend() {
    resendConfirmation.mutate(email, {
      onSuccess: startResendCooldown,
      onError: (resendError) => {
        if (isEmailRateLimitError(resendError)) {
          startResendCooldown();
        }
      },
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {canResend ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={resendConfirmation.isPending}
          onClick={handleResend}
        >
          {resendConfirmation.isPending
            ? "Sending..."
            : "Resend confirmation email"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          You can request another confirmation email in {cooldownSeconds}s.
        </p>
      )}
    </div>
  );
}
