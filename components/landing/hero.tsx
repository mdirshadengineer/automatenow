import Image from "next/image";
import { TrackedLink } from "@/components/landing/tracked-link";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 pt-36 pb-16 text-center">
      <Image
        src="/automatenow.png"
        alt="AutomateNow"
        width={96}
        height={96}
        priority
        className="size-24"
      />
      <div className="flex max-w-2xl flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Automate Work. Accelerate Growth.
        </h1>
        <p className="text-lg text-muted-foreground">
          Build powerful workflows, automate repetitive tasks, and scale your
          business with AI-powered automation — no code required.
        </p>
      </div>
      <div className="flex gap-4">
        <TrackedLink
          href="/signup"
          section="hero"
          label="Get started free"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          Get started free
        </TrackedLink>
        <TrackedLink
          href="/login"
          section="hero"
          label="Sign in"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Sign in
        </TrackedLink>
      </div>
    </section>
  );
}
