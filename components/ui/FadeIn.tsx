"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type FadeInProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
};

/** Generic scroll-triggered fade-and-rise. Respects reduced motion. */
export default function FadeIn({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 28,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      gsap.from(el, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [delay, y] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
