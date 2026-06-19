"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/hooks/mutations/use-auth-mutations";
import {
  getAuthErrorMessage,
  isEmailRateLimitError,
  RESEND_CONFIRMATION_COOLDOWN_SECONDS,
} from "@/lib/auth-errors";

type AuthResendPasswordResetProps = {
  email: string;
};

export function AuthResendPasswordReset({
  email,
}: AuthResendPasswordResetProps) {
  const resetPassword = useResetPasswordMutation();
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
    resetPassword.mutate(
      { email },
      {
        onSuccess: () => {
          startResendCooldown();
          toast.success("Reset link sent. Check your inbox.");
        },
        onError: (resendError) => {
          if (isEmailRateLimitError(resendError)) {
            startResendCooldown();
            return;
          }
          toast.error(getAuthErrorMessage(resendError));
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {canResend ? (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={resetPassword.isPending}
          onClick={handleResend}
        >
          {resetPassword.isPending ? "Sending..." : "Resend email"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          You can request another email in {cooldownSeconds}s.
        </p>
      )}
    </div>
  );
}
