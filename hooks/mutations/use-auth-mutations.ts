"use client";

import * as Sentry from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuthErrorMessage, isExpectedAuthError } from "@/lib/auth-errors";
import { captureProductEvent, resetPostHogUser } from "@/lib/posthog/client";
import { POSTHOG_EVENTS } from "@/lib/posthog/events";
import {
  resendPasswordReset,
  resendSignupConfirmation,
  resetPasswordForEmail,
  signInWithPassword,
  signOut,
  signUp,
  type TurnstileProtected,
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
    mutationFn: (input: TurnstileProtected<LoginInput>) =>
      signInWithPassword(input),
    onSuccess: () => {
      captureProductEvent(POSTHOG_EVENTS.AUTH_SIGNED_IN, { method: "email" });
      router.push("/");
      router.refresh();
    },
    onError: showAuthErrorToast,
  });
}

export function useSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: TurnstileProtected<SignupInput>) => signUp(input),
    onSuccess: (_data, { email }) => {
      captureProductEvent(POSTHOG_EVENTS.AUTH_SIGNED_UP, { method: "email" });
      router.push(`/sign-up-success?email=${encodeURIComponent(email)}`);
      router.refresh();
    },
    onError: showAuthErrorToast,
  });
}

export function useSignOutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.user, null);
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
      captureProductEvent(POSTHOG_EVENTS.AUTH_SIGNED_OUT);
      resetPostHogUser();
      router.push("/login");
      router.refresh();
    },
    onError: (error) => {
      toast.error(getAuthErrorMessage(error));
      captureAuthError(error);
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (input: TurnstileProtected<ForgotPasswordInput>) =>
      resetPasswordForEmail(input),
    onSuccess: () => {
      captureProductEvent(POSTHOG_EVENTS.AUTH_PASSWORD_RESET_REQUESTED, {
        method: "email",
      });
    },
    onError: captureAuthError,
  });
}

export function useResendPasswordResetMutation() {
  return useMutation({
    mutationFn: (input: TurnstileProtected<ForgotPasswordInput>) =>
      resendPasswordReset(input),
    onError: captureAuthError,
  });
}

export function useUpdatePasswordMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: TurnstileProtected<UpdatePasswordInput>) =>
      updatePassword(input),
    onSuccess: () => {
      captureProductEvent(POSTHOG_EVENTS.AUTH_PASSWORD_UPDATED);
      router.push("/");
      router.refresh();
    },
    onError: showAuthErrorToast,
  });
}

export function useResendConfirmationMutation() {
  return useMutation({
    mutationFn: (input: TurnstileProtected<{ email: string }>) =>
      resendSignupConfirmation(input),
    onSuccess: () => {
      captureProductEvent(POSTHOG_EVENTS.AUTH_CONFIRMATION_RESENT, {
        method: "email",
      });
      toast.success("Confirmation email sent. Check your inbox.");
    },
    onError: (error) => {
      toast.error(getAuthErrorMessage(error));
      captureAuthError(error);
    },
  });
}
