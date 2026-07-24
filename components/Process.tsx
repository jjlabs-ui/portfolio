"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { lang, t } = useI18n();
  const processSteps = t.process.steps;
  const current = processSteps[active];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-step]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="processo"
      aria-labelledby="processo-title"
      className="border-t border-line bg-bg-alt py-[var(--space-section)]"
    >
      <div className="shell">
        <header className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">{t.process.eyebrow}</p>
            <SplitReveal
              key={lang}
              as="h2"
              id="processo-title"
              className="display text-[clamp(2rem,5vw,4rem)]"
              by="words"
            >
              {t.process.title}
            </SplitReveal>
          </div>
          <FadeIn
            as="p"
            className="text-base leading-relaxed text-muted md:col-span-5"
          >
            {t.process.intro}
          </FadeIn>
        </header>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Step list */}
          <ol className="flex flex-col border-t border-line lg:col-span-5" role="list">
            {processSteps.map((step, i) => {
              const isActive = active === i;
              return (
                <li key={step.index} data-step>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`flex w-full items-baseline gap-5 border-b border-line py-6 text-left transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <span className="font-mono text-xs">{step.index}</span>
                    <span
                      className={`flex-1 text-2xl tracking-tight md:text-3xl ${
                        isActive ? "font-medium" : "font-normal"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`hidden font-mono text-xs sm:inline ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      {step.meta}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Active detail */}
          <div
            className="flex flex-col justify-center border-t border-line pt-8 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
            aria-live="polite"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {t.process.step} {current.index}
            </p>
            <h3 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
              {current.title}
            </h3>
            <p className="mt-4 inline-flex w-fit border border-ink px-3 py-1.5 font-mono text-xs">
              {current.meta}
            </p>
            <p className="mt-8 text-lg leading-relaxed text-muted md:text-xl">
              {current.summary}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
              {current.detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
