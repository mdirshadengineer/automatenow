"use client";

import * as Sentry from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuthErrorMessage, isExpectedAuthError } from "@/lib/auth-errors";
import {
  resendSignupConfirmation,
  resetPasswordForEmail,
  signInWithPassword,
  signOut,
  signUp,
  updatePassword,
} from "@/lib/queries/auth";
import type {
  ForgotPasswordInput,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
} from "@/lib/validation";

function captureAuthError(error: unknown) {
  if (isExpectedAuthError(error)) {
    return;
  }

  Sentry.captureException(error);
}

function showAuthErrorToast(error: unknown) {
  toast.error(getAuthErrorMessage(error));
  captureAuthError(error);
}

export function useSignInMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: LoginInput) => signInWithPassword(input),
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
    onError: showAuthErrorToast,
  });
}

export function useSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: SignupInput) => signUp(input),
    onSuccess: (_data, { email }) => {
      router.push(`/sign-up-success?email=${encodeURIComponent(email)}`);
      router.refresh();
    },
    onError: showAuthErrorToast,
  });
}

export function useSignOutMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
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
    onError: showAuthErrorToast,
  });
}

export function useResendConfirmationMutation() {
  return useMutation({
    mutationFn: (email: string) => resendSignupConfirmation(email),
    onSuccess: () => {
      toast.success("Confirmation email sent. Check your inbox.");
    },
    onError: (error) => {
      toast.error(getAuthErrorMessage(error));
      captureAuthError(error);
    },
  });
}
