"use client";

import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthUser } from "@/lib/queries/auth";
import { queryKeys } from "@/lib/query-keys";

export function useUser(initialData?: User | null) {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: fetchAuthUser,
    initialData,
  });
}
