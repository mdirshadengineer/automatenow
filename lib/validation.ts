import { type } from "arktype";

export const emailField = type("string.email");

export const passwordField = type("string");

export const loginSchema = type({
  email: "string.email",
  password: "string",
});

export const signupSchema = type({
  email: "string.email",
  password: "string",
});

export const forgotPasswordSchema = type({
  email: "string.email",
});

export const updatePasswordSchema = type({
  password: "string",
});

export type LoginInput = typeof loginSchema.infer;
export type SignupInput = typeof signupSchema.infer;
export type ForgotPasswordInput = typeof forgotPasswordSchema.infer;
export type UpdatePasswordInput = typeof updatePasswordSchema.infer;
