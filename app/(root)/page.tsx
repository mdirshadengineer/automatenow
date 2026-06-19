import type { Metadata } from "next";
import Image from "next/image";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = {
  title: "AutomateNow - Automate Work. Accelerate Growth",
  description:
    "Build powerful workflows, automate repetitive tasks, and scale your business with AI-powered automation.",
};

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 p-6">
      <Image
        src="/automatenow.png"
        alt="AutomateNow"
        width={120}
        height={120}
        priority
        className="size-30"
      />
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <SignOutButton />
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
