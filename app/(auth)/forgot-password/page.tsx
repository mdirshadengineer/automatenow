import type { Metadata } from "next";
import Image from "next/image";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password - AutomateNow",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <Image
        src="/automatenow.png"
        alt="AutomateNow"
        width={80}
        height={80}
        priority
        className="size-20"
      />
      <ForgotPasswordForm />
    </div>
  );
}
