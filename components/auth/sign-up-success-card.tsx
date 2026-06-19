"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthResendConfirmation } from "@/components/auth/auth-resend-confirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignUpSuccessCard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
        <CardDescription>Check your email to confirm</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {email ? (
          <>
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a confirmation link to{" "}
              <span className="font-medium text-foreground">{email}</span>.
              Please check your inbox (and spam) before signing in.
            </p>
            <AuthResendConfirmation email={email} />
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              You&apos;ve successfully signed up. Please check your email to
              confirm your account before signing in.
            </p>
            <p className="text-sm text-muted-foreground">
              Already confirmed?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
