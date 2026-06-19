import Link from "next/link";

export function Cta() {
  return (
    <section className="border-t py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join the future of automation. Start building in minutes — no credit
          card required.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            Start building free
          </Link>
        </div>
      </div>
    </section>
  );
}
