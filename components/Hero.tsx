"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { INTRO_COMPLETE_EVENT } from "@/components/Preloader";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const h = t.hero;

  useGSAP(
    () => {
      const heading = root.current?.querySelector<HTMLElement>("[data-hero-heading]");
      const reduced = prefersReducedMotion();

      let split: SplitType | null = null;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });

      if (heading && !reduced) {
        split = new SplitType(heading, { types: "lines,words", lineClass: "split-line" });
      }

      if (split?.words?.length) {
        gsap.set(split.words, { yPercent: 130 });
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-hero-word]", { autoAlpha: 0, scale: 1.06 });

        const revealLines = () => {
          const heading = root.current?.querySelector("[data-hero-heading]");
          const lineEls = heading?.querySelectorAll<HTMLElement>(".split-line");
          if (lineEls?.length) gsap.set(lineEls, { overflow: "visible" });
          else if (split?.lines) gsap.set(split.lines, { overflow: "visible" });
        };

        tl.to("[data-hero-word]", { autoAlpha: 0.05, scale: 1, duration: 1.4 })
          .to(
            split.words,
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.06,
              onComplete: revealLines,
            },
            0.1,
          )
          .to(
            "[data-hero-fade]",
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
            "-=0.6",
          );
      }

      const start = () => tl.play();

      if (reduced) {
        window.addEventListener(INTRO_COMPLETE_EVENT, start, { once: true });
      } else {
        window.addEventListener(INTRO_COMPLETE_EVENT, start, { once: true });
        // Fallback in case the intro already fired (e.g. fast refresh).
        gsap.delayedCall(2.4, start);
      }

      // Subtle parallax on the background word.
      if (!reduced) {
        gsap.to("[data-hero-word]", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => {
        window.removeEventListener(INTRO_COMPLETE_EVENT, start);
        split?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-label={h.aria}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24"
    >
      {/* Oversized background word, cropped by the viewport edges */}
      <span
        data-hero-word
        aria-hidden
        className="pointer-events-none absolute -right-[8vw] bottom-[6vh] select-none font-medium leading-none tracking-tighter text-ink"
        style={{ fontSize: "clamp(9rem, 34vw, 30rem)", opacity: 0 }}
      >
        BUILD
      </span>

      <div className="shell relative z-10 grid w-full gap-12 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p
            data-hero-fade
            className="eyebrow mb-8 flex items-center gap-3"
          >
            <span className="inline-block h-px w-10 bg-ink" />
            {site.role} · {h.portfolio} {site.year}
          </p>

          <h1
            key={lang}
            data-hero-heading
            className="display max-w-[16ch] pb-[0.12em] text-[clamp(2.25rem,6vw,5.25rem)]"
            style={{ lineHeight: 1.12 }}
          >
            {h.h.lead}{" "}
            <em className="font-serif italic text-ink">{h.h.em1}</em>{" "}
            {h.h.mid}{" "}
            <span className="bg-ink px-2 py-[0.02em] text-bg [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {h.h.hl}
            </span>
            , {h.h.tail} <em className="font-serif italic">{h.h.em2}</em>.
          </h1>

          <p
            data-hero-fade
            className="mt-8 max-w-[52ch] text-lg text-muted sm:text-xl"
          >
            {h.subtitle}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <a
                href="#projetos"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3 text-sm text-bg transition-colors duration-300 hover:bg-transparent hover:text-ink"
              >
                {h.ctaProjects}
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contato"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 border-b border-ink py-1 text-sm"
              >
                {h.ctaTalk}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Meta técnica / disponibilidade */}
        <aside
          data-hero-fade
          className="flex flex-col gap-0 border-t border-line pt-6 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          aria-label={h.quickInfo}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 lg:flex-col lg:gap-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                {h.baseLabel}
              </p>
              <p className="mt-2 text-sm font-medium tracking-tight text-ink">
                {h.baseValue}
              </p>
              <p className="mt-0.5 text-xs text-muted">{h.baseHint}</p>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                {h.specLabel}
              </p>
              <p className="mt-2 text-sm font-medium tracking-tight text-ink">
                {h.specValue}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {h.specHint}
              </p>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                {h.statusLabel}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-ink">
                <span
                  className="relative flex h-2 w-2"
                  aria-hidden
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                </span>
                {h.statusValue}
              </p>
              <p className="mt-0.5 text-xs text-muted">{h.statusHint}</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Scroll indicator — desktop only (native scroll on mobile) */}
      <div
        data-hero-fade
        className="shell absolute inset-x-0 bottom-6 z-10 hidden items-center justify-between md:flex"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {h.scroll}
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce text-muted" aria-hidden />
      </div>
    </section>
  );
}
