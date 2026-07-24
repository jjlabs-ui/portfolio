"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";

export const INTRO_COMPLETE_EVENT = "app:intro-complete";

/**
 * Short GSAP loading intro. Announces name, role and portfolio year, then a
 * horizontal line sweeps across the screen and wipes the overlay to reveal the
 * hero. Emits an event so the hero can start its own reveal in sequence.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
        document.body.removeAttribute("data-loading");
        setDone(true);
      };

      if (prefersReducedMotion()) {
        gsap.set(root.current, { autoAlpha: 0 });
        document.body.removeAttribute("data-loading");
        // Give the hero its cue on the next frame.
        requestAnimationFrame(finish);
        return;
      }

      document.body.setAttribute("data-loading", "true");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.set(".intro-line", { scaleX: 0, transformOrigin: "left center" })
        .from(".intro-word", {
          yPercent: 120,
          duration: 0.7,
          stagger: 0.09,
        })
        .to(
          ".intro-word",
          { yPercent: -120, duration: 0.55, stagger: 0.06, delay: 0.35 },
          "sweep",
        )
        .to(".intro-line", { scaleX: 1, duration: 0.7 }, "sweep")
        .to(".intro-line", {
          scaleY: 40,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power4.inOut",
        })
        .to(root.current, { autoAlpha: 0, duration: 0.35 }, "-=0.1");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-bg"
      aria-hidden
    >
      <div className="shell flex w-full flex-col items-start gap-2">
        <div className="overflow-hidden">
          <span className="intro-word block font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Portfolio / {site.year}
          </span>
        </div>
        <div className="overflow-hidden pb-[0.15em] pt-[0.35em]">
          <span className="intro-word display block text-[clamp(2.5rem,9vw,7rem)] leading-[1.2]">
            JOÃO PEDRO
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="intro-word block font-mono text-xs uppercase tracking-[0.2em] text-muted sm:text-sm">
            Full Stack Developer
          </span>
        </div>
      </div>
      <div className="intro-line absolute left-0 top-1/2 h-px w-full bg-ink" />
    </div>
  );
}
