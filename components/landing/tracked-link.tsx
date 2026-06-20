"use client";

import Link from "next/link";
import { captureProductEvent } from "@/lib/posthog/client";
import type { PostHogEventName } from "@/lib/posthog/events";
import { POSTHOG_EVENTS } from "@/lib/posthog/events";

type TrackedLinkProps = {
  href: string;
  section: string;
  label: string;
  className?: string;
  event?: PostHogEventName;
  children: React.ReactNode;
};

export function TrackedLink({
  href,
  section,
  label,
  className,
  event = POSTHOG_EVENTS.LANDING_CTA_CLICKED,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        captureProductEvent(event, { section, label, destination: href });
      }}
    >
      {children}
    </Link>
  );
}
