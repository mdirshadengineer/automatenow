"use client";

import { useEffect, useRef, useState } from "react";
import {
  TurnstileField,
  type TurnstileFieldHandle,
} from "@/components/auth/turnstile-field";
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
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const pendingResendRef = useRef(false);

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

  function handleToken(token: string | null) {
    if (!token || !pendingResendRef.current) {
      return;
    }

    pendingResendRef.current = false;

    resendConfirmation.mutate(
      { email, turnstileToken: token },
      {
        onSuccess: startResendCooldown,
        onError: (resendError) => {
          if (isEmailRateLimitError(resendError)) {
            startResendCooldown();
          }
          turnstileRef.current?.reset();
        },
      },
    );
  }

  function handleResend() {
    pendingResendRef.current = true;
    turnstileRef.current?.execute();
  }

  return (
    <div className="flex flex-col gap-2">
      <TurnstileField
        ref={turnstileRef}
        size="invisible"
        execution="execute"
        onTokenChange={handleToken}
      />

      {canResend ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={resendConfirmation.isPending}
          onClick={handleResend}
        >
          {resendConfirmation.isPending ? "Sending..." : "Resend email"}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          You can request another email in {cooldownSeconds}s.
        </p>
      )}
    </div>
  );
}
