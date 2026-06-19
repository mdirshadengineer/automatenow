"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryKeys } from "@/lib/query-keys";
import { createClient } from "@/lib/supabase/client";

export function AuthQuerySync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return null;
}
