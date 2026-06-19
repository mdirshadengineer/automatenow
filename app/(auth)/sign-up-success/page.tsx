import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpSuccessCard } from "@/components/auth/sign-up-success-card";

export const metadata: Metadata = {
  title: "Sign Up Success - AutomateNow",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense>
        <SignUpSuccessCard />
      </Suspense>
    </div>
  );
}
