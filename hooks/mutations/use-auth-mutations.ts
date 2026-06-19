"use client";

import * as Sentry from "@sentry/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  resetPasswordForEmail,
  signInWithPassword,
  signOut,
  signUp,
  updatePassword,
} from "@/lib/queries/auth";
import { queryKeys } from "@/lib/query-keys";
import type {
  ForgotPasswordInput,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
} from "@/lib/validation";

function captureAuthError(error: unknown) {
  Sentry.captureException(error);
}

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: LoginInput) => signInWithPassword(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
      router.push("/");
      router.refresh();
    },
    onError: captureAuthError,
  });
}

export function useSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: SignupInput) => signUp(input),
    onSuccess: () => {
      router.push("/sign-up-success");
      router.refresh();
    },
    onError: captureAuthError,
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
      router.push("/login");
      router.refresh();
    },
    onError: captureAuthError,
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) => resetPasswordForEmail(input),
    onError: captureAuthError,
  });
}

export function useUpdatePasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: UpdatePasswordInput) => updatePassword(input),
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
    onError: captureAuthError,
  });
}
