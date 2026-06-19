import { isAuthError, type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type {
  ForgotPasswordInput,
  LoginInput,
  SignupInput,
  UpdatePasswordInput,
} from "@/lib/validation";

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

export async function signInWithPassword({ email, password }: LoginInput) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }
}

const DUPLICATE_SIGNUP_CODES = new Set(["email_exists"]);

export async function signUp({ email, password }: SignupInput) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/confirm?next=/`,
    },
  });

  if (error) {
    if (isAuthError(error) && DUPLICATE_SIGNUP_CODES.has(error.code ?? "")) {
      return;
    }
    throw error;
  }

  if (data.user?.identities?.length === 0) {
    return;
  }
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function resetPasswordForEmail({ email }: ForgotPasswordInput) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/confirm?next=/update-password`,
  });

  if (error) {
    throw error;
  }
}

export async function updatePassword({ password }: UpdatePasswordInput) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw error;
  }
}

export async function resendSignupConfirmation(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/confirm?next=/`,
    },
  });

  if (error) {
    throw error;
  }
}
