"use client";

import { useRef } from "react";
import { ShieldCheck, Code2, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const icons = { shield: ShieldCheck, code: Code2 };

export default function WorkModels() {
  const root = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const wm = t.workModels;
  const models = wm.items;
  const whatsappHref = `${site.whatsapp.href}?text=${encodeURIComponent(wm.whatsapp)}`;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-model]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="modelos"
      aria-labelledby="modelos-title"
      className="border-t border-line py-[var(--space-section)]"
    >
      <div className="shell">
        <header className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4">{wm.eyebrow}</p>
            <SplitReveal
              key={lang}
              as="h2"
              id="modelos-title"
              className="display text-[clamp(2rem,5vw,4rem)]"
              by="words"
            >
              {wm.title}
            </SplitReveal>
          </div>
          <p className="text-sm text-muted md:col-span-4">{wm.subtitle}</p>
        </header>

        <div className="grid border-t border-line md:grid-cols-2">
          {models.map((model, i) => {
            const Icon = model.icon === "shield" ? icons.shield : icons.code;
            return (
              <article
                key={model.tag}
                data-model
                className={`flex flex-col gap-6 border-b border-line py-10 md:py-12 ${
                  i === 0 ? "md:border-r md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    {model.tag}
                  </span>
                </div>

                <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                  {model.title}
                </h3>

                <p className="max-w-[46ch] text-base leading-relaxed text-muted">
                  {model.description}
                </p>

                <ul className="mt-2 flex flex-col gap-3" role="list">
                  {model.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 border-t border-line pt-3 text-sm text-ink"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[42ch] text-lg text-muted">{wm.ctaText}</p>
          <Magnetic strength={0.25}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium"
            >
              {wm.ctaButton}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
