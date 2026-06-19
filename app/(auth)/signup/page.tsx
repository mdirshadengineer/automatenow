import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create an account - AutomateNow",
};

export default function SignupPage() {
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
      <SignupForm />
    </div>
  );
}
