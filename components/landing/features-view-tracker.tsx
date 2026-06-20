"use client";

import { useEffect, useRef } from "react";
import { captureProductEvent } from "@/lib/posthog/client";
import { POSTHOG_EVENTS } from "@/lib/posthog/events";

type FeaturesViewTrackerProps = {
  featureCount: number;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

export function FeaturesViewTracker({
  featureCount,
  className,
  id,
  children,
}: FeaturesViewTrackerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasCaptured = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasCaptured.current) {
          return;
        }

        hasCaptured.current = true;
        captureProductEvent(POSTHOG_EVENTS.LANDING_FEATURES_VIEWED, {
          feature_count: featureCount,
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [featureCount]);

  return (
    <section ref={sectionRef} className={className} id={id}>
      {children}
    </section>
  );
}
