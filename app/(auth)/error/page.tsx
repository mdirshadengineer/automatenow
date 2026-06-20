import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Error - AutomateNow",
};

const ROUTE_ERROR_MESSAGES: Record<
  string,
  { message: string; action?: { href: string; label: string } }
> = {
  auth_callback_error: {
    message:
      "This sign-in or reset link could not be verified. Request a new link and open it in the same browser where possible.",
    action: { href: "/forgot-password", label: "Request a new reset link" },
  },
  auth_callback_missing_code: {
    message: "This link is incomplete or has already been used.",
    action: { href: "/login", label: "Back to sign in" },
  },
  auth_confirm_error: {
    message:
      "This email link has expired or is invalid. Request a new link and try again.",
    action: { href: "/forgot-password", label: "Request a new reset link" },
  },
  auth_confirm_missing_params: {
    message: "This link is incomplete or has already been used.",
    action: { href: "/login", label: "Back to sign in" },
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  const routeError = params?.error
    ? ROUTE_ERROR_MESSAGES[params.error]
    : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sorry, something went wrong.</CardTitle>
        <CardDescription>
          {routeError?.message ??
            "An unspecified error occurred. Please try again."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {routeError?.action ? (
          <Button asChild variant="outline" className="w-full">
            <Link href={routeError.action.href}>{routeError.action.label}</Link>
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Back to sign in</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
