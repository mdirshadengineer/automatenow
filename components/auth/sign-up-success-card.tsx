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
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>Instructions to continue</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          If an account can be created or requires verification, you&apos;ll
          receive an email with next steps. Check your inbox and spam folder.
          {email ? (
            <>
              {" "}
              Look for an email at{" "}
              <span className="font-medium text-foreground">{email}</span>.
            </>
          ) : null}
        </p>

        {email ? <AuthResendConfirmation email={email} /> : null}

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
