import { type } from "arktype";

export const emailField = type("string.email");

export const passwordField = type("string >= 8");

export const loginSchema = type({
  email: "string.email",
  password: passwordField,
});

export const signupSchema = type({
  email: "string.email",
  password: passwordField,
});

export const signupFormSchema = type({
  email: "string.email",
  password: passwordField,
  confirmPassword: "string",
}).narrow(
  (input, ctx) =>
    input.password === input.confirmPassword ||
    ctx.reject({ expected: "to match password", path: ["confirmPassword"] }),
);

export const forgotPasswordSchema = type({
  email: "string.email",
});

export const updatePasswordSchema = type({
  password: "string",
});

export type LoginInput = typeof loginSchema.infer;
export type SignupInput = typeof signupSchema.infer;
export type SignupFormInput = typeof signupFormSchema.infer;
export type ForgotPasswordInput = typeof forgotPasswordSchema.infer;
export type UpdatePasswordInput = typeof updatePasswordSchema.infer;
