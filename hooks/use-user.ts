"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAuthUser } from "@/lib/queries/auth";
import { queryKeys } from "@/lib/query-keys";

export function useUser() {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: fetchAuthUser,
  });
}
