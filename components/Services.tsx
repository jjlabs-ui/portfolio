"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const s = t.services;
  const modelLabels = { open: s.modelOpen, licenca: s.modelLicenca };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-service]");
      rows.forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="servicos"
      aria-labelledby="servicos-title"
      className="py-[var(--space-section)]"
    >
      <div className="shell">
        <header className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4">{s.eyebrow}</p>
            <SplitReveal
              key={lang}
              as="h2"
              id="servicos-title"
              className="display text-[clamp(2rem,5vw,4rem)]"
              by="words"
            >
              {s.title}
            </SplitReveal>
          </div>
          <div className="text-sm text-muted md:col-span-4">
            <p>{s.intro}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                {s.modelOpen}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {s.modelLicenca}
              </span>
            </p>
          </div>
        </header>

        <ul className="border-t border-line" role="list">
          {s.items.map((service) => (
            <li
              key={service.index}
              data-service
              className="group border-b border-line"
            >
              <div className="grid cursor-default grid-cols-12 items-center gap-x-4 gap-y-3 py-6 transition-[padding] duration-500 ease-editorial group-hover:pl-4 md:py-7">
                <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">
                  {service.index}
                </span>
                <h3 className="col-span-10 text-2xl font-normal tracking-tight transition-[font-weight,letter-spacing] duration-300 group-hover:font-medium md:col-span-4 md:text-3xl">
                  {service.title}
                </h3>
                <p className="col-span-12 text-sm leading-relaxed text-muted md:col-span-4 md:opacity-60 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                  {service.description}
                </p>
                <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                  {service.models.map((model) => (
                    <span
                      key={model}
                      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider ${
                        model === "open"
                          ? "border-accent-blue/40 text-accent-blue"
                          : "border-line text-ink"
                      }`}
                    >
                      {model === "open" ? modelLabels.open : modelLabels.licenca}
                    </span>
                  ))}
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                    {service.timeline}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-[60ch] text-sm text-muted">{s.note}</p>
      </div>
    </section>
  );
}
