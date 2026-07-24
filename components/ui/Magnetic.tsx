"use client";

import { useRef, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
};

/**
 * Wraps a single child and applies a subtle magnetic pull toward the cursor.
 * No-ops for reduced motion and coarse pointers.
 */
export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches)
        return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

      const onMove = contextSafe((e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      });

      const onLeave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  if (!isValidElement(children)) {
    return (
      <span ref={ref} className="inline-block">
        {children}
      </span>
    );
  }

  // Attach the ref to a wrapper to keep the child's own props intact.
  return (
    <span ref={ref} className="inline-block will-change-transform">
      {children as ReactElement}
    </span>
  );
}
