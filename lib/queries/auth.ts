import { AuthApiError, type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type {
  ForgotPasswordInput,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
} from "@/lib/validation";

export type TurnstileProtected<T> = T & { turnstileToken: string };

type AuthApiErrorBody = {
  code?: string;
  message?: string;
};

async function postAuth(path: string, body: Record<string, unknown>) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return;
  }

  const data = (await response.json()) as AuthApiErrorBody;

  throw new AuthApiError(
    data.message ?? "Something went wrong. Please try again.",
    response.status,
    data.code,
  );
}

export async function fetchAuthUser(): Promise<User | null> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}

export async function signInWithPassword({
  email,
  password,
  turnstileToken,
}: TurnstileProtected<LoginInput>) {
  await postAuth("/api/auth/sign-in", { email, password, turnstileToken });
}

export async function signUp({
  email,
  password,
  turnstileToken,
}: TurnstileProtected<SignupInput>) {
  await postAuth("/api/auth/sign-up", { email, password, turnstileToken });
}

export async function signOut() {
  await postAuth("/api/auth/sign-out", {});
}

export async function resetPasswordForEmail({
  email,
  turnstileToken,
}: TurnstileProtected<ForgotPasswordInput>) {
  await postAuth("/api/auth/forgot-password", { email, turnstileToken });
}

export async function resendPasswordReset({
  email,
  turnstileToken,
}: TurnstileProtected<ForgotPasswordInput>) {
  await postAuth("/api/auth/resend-password-reset", { email, turnstileToken });
}

export async function updatePassword({
  password,
  turnstileToken,
}: TurnstileProtected<UpdatePasswordInput>) {
  await postAuth("/api/auth/update-password", { password, turnstileToken });
}

export async function resendSignupConfirmation({
  email,
  turnstileToken,
}: TurnstileProtected<{ email: string }>) {
  await postAuth("/api/auth/resend-confirmation", { email, turnstileToken });
}
