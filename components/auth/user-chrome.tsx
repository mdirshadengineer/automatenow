"use client";

import type { User } from "@supabase/supabase-js";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

type UserChromeProps = {
  initialUser: User | null;
};

export function UserChrome({ initialUser }: UserChromeProps) {
  const { data: user, isLoading, isError, error, refetch } = useUser(initialUser);

  if (isLoading) {
    return <p className="text-muted-foreground">Loading account...</p>;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Unable to load account."}
        </p>
        <Button type="button" variant="outline" size="sm" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (!user) {
    return <p className="text-muted-foreground">Not signed in.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground">
        Signed in as <span className="font-medium text-foreground">{user.email}</span>
      </p>
      <SignOutButton />
    </div>
  );
}
