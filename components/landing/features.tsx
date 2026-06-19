import {
  IconBrain,
  IconCode,
  IconDots,
  IconRocket,
} from "@tabler/icons-react";

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
    <section className="py-24" id="features">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to automate
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features that make automation simple, fast, and accessible
            to everyone.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-lg border p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
