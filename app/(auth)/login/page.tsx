import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in - AutomateNow",
};

export default function LoginPage() {
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
      <LoginForm />
    </div>
  );
}
