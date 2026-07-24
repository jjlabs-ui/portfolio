"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type SplitRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Split by "lines" (default) or "words". */
  by?: "lines" | "words";
  stagger?: number;
  id?: string;
};

/**
 * Reveals text by masking lines (or words) and sliding them up on scroll.
 * Falls back to a plain, fully visible element under reduced motion.
 */
export default function SplitReveal({
  children,
  as: Tag = "p",
  className,
  by = "lines",
  stagger = 0.08,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = new SplitType(el, {
        types: by === "words" ? "words" : "lines,words",
        lineClass: "split-line",
      });
      const targets = split.words ?? [];

      if (targets.length) {
        gsap.set(targets, { yPercent: 130 });
        gsap.to(targets, {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          // Once revealed, stop clipping the lines so descenders (g, p, j) and
          // accents (ã, é) are never cut off in the final resting state.
          onComplete: () => {
            if (split.lines?.length)
              gsap.set(split.lines, { overflow: "visible" });
          },
        });
      }

      return () => split.revert();
    },
    { scope: ref, dependencies: [by, stagger] },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
