import { IconBrain, IconCode, IconDots, IconRocket } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI-Powered Workflows",
    description:
      "Leverage AI to create intelligent automations that adapt to your business processes. No coding required.",
    icon: IconBrain,
  },
  {
    title: "Visual Builder",
    description:
      "Design complex workflows with a drag-and-drop interface. See your automation logic come to life in real time.",
    icon: IconCode,
  },
  {
    title: "Scale Effortlessly",
    description:
      "From solo projects to enterprise operations, AutomateNow scales with you. Built on modern infrastructure.",
    icon: IconRocket,
  },
  {
    title: "Endless Possibilities",
    description:
      "Connect your tools, automate reports, trigger actions, and more. The only limit is your imagination.",
    icon: IconDots,
  },
];

export function Features() {
  return (
    <section className="relative py-24 sm:py-32" id="features">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/0.12,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,var(--muted)/0.35,transparent)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Everything you need to automate
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            Powerful features that make automation simple, fast, and accessible
            to everyone.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300",
                  "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5",
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex flex-col gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" stroke={1.75} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
