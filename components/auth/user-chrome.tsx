"use client";

import type { User } from "@supabase/supabase-js";
import { IconLogout } from "@tabler/icons-react";
import { UserAvatarTrigger } from "@/components/auth/user-avatar";
import { ThemeMenuSection } from "@/components/theme/theme-menu-section";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOutMutation } from "@/hooks/mutations/use-auth-mutations";
import { useUser } from "@/hooks/use-user";

type UserChromeProps = {
  initialUser: User | null;
};

export function UserChrome({ initialUser }: UserChromeProps) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useUser(initialUser);
  const signOut = useSignOutMutation();

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading account...</p>;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2">
        <p className="max-w-40 truncate text-sm text-destructive">
          {error instanceof Error ? error.message : "Unable to load account."}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!user?.email) {
    return <p className="text-sm text-muted-foreground">Not signed in.</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatarTrigger email={user.email} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[100] w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="truncate text-sm font-medium text-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <ThemeMenuSection />
        <DropdownMenuItem
          variant="destructive"
          disabled={signOut.isPending}
          onClick={() => signOut.mutate()}
        >
          <IconLogout className="size-4" />
          {signOut.isPending ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
