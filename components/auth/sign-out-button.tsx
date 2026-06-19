"use client";

import * as Sentry from "@sentry/nextjs";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      Sentry.captureException(error);
      setLoading(false);
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={loading}>
      <IconLogout className="size-4" />
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
