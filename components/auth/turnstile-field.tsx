"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { env } from "@/env";
import { cn } from "@/lib/utils";

export type TurnstileFieldHandle = {
  reset: () => void;
  execute: () => void;
};

type TurnstileFieldProps = {
  onTokenChange: (token: string | null) => void;
  size?: "normal" | "compact" | "invisible";
  execution?: "render" | "execute";
  className?: string;
};

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField(
  { onTokenChange, size = "normal", execution = "render", className },
  ref,
) {
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      turnstileRef.current?.reset();
      onTokenChange(null);
    },
    execute: () => {
      turnstileRef.current?.execute();
    },
  }));

  return (
    <div className={cn("flex justify-center", className)}>
      <Turnstile
        ref={turnstileRef}
        siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        onSuccess={onTokenChange}
        onExpire={() => onTokenChange(null)}
        onError={() => onTokenChange(null)}
        options={{
          theme: "auto",
          size,
          execution,
        }}
      />
    </div>
  );
});
