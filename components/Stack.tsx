"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { stack } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";

const sizeMap: Record<string, string> = {
  xl: "text-[clamp(3rem,9vw,7rem)]",
  lg: "text-[clamp(2.25rem,6.5vw,5rem)]",
  md: "text-[clamp(1.75rem,5vw,3.75rem)] text-muted",
  sm: "text-[clamp(1.5rem,4vw,3rem)] text-muted",
};

function Row({
  direction = 1,
  speed = 40,
}: {
  direction?: 1 | -1;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || prefersReducedMotion()) return;

      // The track holds two identical sequences. Sliding by exactly one half
      // lands on a visually identical frame, so a plain repeat loops seamlessly.
      const half = track.scrollWidth / 2;
      const from = direction === 1 ? 0 : -half;
      const to = direction === 1 ? -half : 0;

      gsap.set(track, { x: from });
      const tween = gsap.fromTo(
        track,
        { x: from },
        { x: to, duration: half / speed, ease: "none", repeat: -1 },
      );

      return () => {
        tween.kill();
      };
    },
    { scope: trackRef, dependencies: [direction, speed] },
  );

  const items = [...stack, ...stack];

  return (
    <div className="overflow-hidden py-[0.12em]">
      <div ref={trackRef} className="marquee-track items-baseline gap-[0.6em] leading-[1.2]">
        {items.map((tech, i) => (
          <span
            key={`${tech.name}-${i}`}
            className={`display inline-flex items-baseline leading-[1.2] ${sizeMap[tech.weight]}`}
          >
            {tech.name}
            <span className="mx-[0.35em] inline-block h-[0.12em] w-[0.12em] rounded-full bg-accent-blue align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const { lang, t } = useI18n();
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="border-t border-line py-[var(--space-section)]"
    >
      <div className="shell mb-14">
        <p className="eyebrow mb-4">{t.stack.eyebrow}</p>
        <SplitReveal
          key={lang}
          as="h2"
          id="stack-title"
          className="display text-[clamp(2rem,5vw,4rem)]"
          by="words"
        >
          {t.stack.title}
        </SplitReveal>
      </div>

      <div className="flex flex-col gap-4" aria-hidden>
        <Row direction={1} speed={55} />
        <Row direction={-1} speed={45} />
      </div>

      <ul className="sr-only">
        {stack.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  );
}
