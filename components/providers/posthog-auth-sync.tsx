"use client";

import { useEffect } from "react";
import { identifyPostHogUser, resetPostHogUser } from "@/lib/posthog/client";
import { createClient } from "@/lib/supabase/client";

export function PostHogAuthSync() {
  useEffect(() => {
    const supabase = createClient();

    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        identifyPostHogUser(user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;

      if (
        user &&
        (event === "SIGNED_IN" ||
          event === "TOKEN_REFRESHED" ||
          event === "USER_UPDATED")
      ) {
        identifyPostHogUser(user);
        return;
      }

      if (event === "SIGNED_OUT") {
        resetPostHogUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
