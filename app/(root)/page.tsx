import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { getUser } from "@/lib/get-user";

export const metadata: Metadata = {
  title: "AutomateNow - Automate Work. Accelerate Growth",
  description:
    "Build powerful workflows, automate repetitive tasks, and scale your business with AI-powered automation.",
};

export default async function Page() {
  const user = await getUser();

  return (
    <div className="flex min-h-svh flex-col">
      <Header initialUser={user} />
      <main className="flex-1">
        <Hero />
        <Features />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
