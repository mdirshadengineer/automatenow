"use client";

import { IconLogout } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useSignOutMutation } from "@/hooks/mutations/use-auth-mutations";

export function SignOutButton() {
  const signOut = useSignOutMutation();

  return (
    <Button
      variant="outline"
      onClick={() => signOut.mutate()}
      disabled={signOut.isPending}
    >
      <IconLogout className="size-4" />
      {signOut.isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
