import type { Metadata } from "next";
import Image from "next/image";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata: Metadata = {
  title: "Update password - AutomateNow",
};

export default function UpdatePasswordPage() {
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
      <UpdatePasswordForm />
    </div>
  );
}
