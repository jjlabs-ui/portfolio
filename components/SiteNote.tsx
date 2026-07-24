"use client";

import { useRef } from "react";
import { Gauge, Search, Accessibility, Sparkles } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

const builtWith = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Lenis",
];

const icons = {
  gauge: Gauge,
  search: Search,
  accessibility: Accessibility,
  sparkles: Sparkles,
} as const;

export default function SiteNote() {
  const root = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const sn = t.siteNote;
  const principles = sn.principles;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-principle]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-principles]", start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="sobre-o-site"
      aria-labelledby="sitenote-title"
      className="border-t border-line py-[var(--space-section)]"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8">{sn.eyebrow}</p>
            <SplitReveal
              key={lang}
              as="h2"
              id="sitenote-title"
              className="display max-w-[20ch] text-[clamp(2rem,5vw,4rem)]"
            >
              {sn.hPrefix}
              <em className="font-serif italic">{sn.hEm}</em>
              {sn.hSuffix}
            </SplitReveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-2">
            <FadeIn as="p" className="text-lg leading-relaxed text-muted">
              {sn.p1}
            </FadeIn>
            <FadeIn as="p" delay={0.06} className="text-lg leading-relaxed text-muted">
              {sn.p2}
            </FadeIn>

            <FadeIn delay={0.1} className="mt-2">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
                {sn.builtWith}
              </p>
              <ul className="flex flex-wrap gap-2" role="list">
                {builtWith.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-3 py-1.5 font-mono text-xs text-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>

        <FadeIn className="mt-16 flex flex-col gap-6 border border-line p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {sn.priceLabel}
            </p>
            <p className="mt-3 display text-[clamp(2.25rem,5vw,3.5rem)] leading-none">
              {sn.priceValue}
            </p>
          </div>
          <p className="max-w-[34ch] text-sm leading-relaxed text-muted sm:text-right">
            {sn.priceHint}
          </p>
        </FadeIn>

        <ul
          data-principles
          className="mt-20 grid border-t border-line md:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {principles.map((p, i) => {
            const Icon = icons[p.icon as keyof typeof icons];
            return (
              <li
                key={p.title}
                data-principle
                className={`flex flex-col gap-4 border-b border-line py-8 md:py-10 lg:border-b-0 lg:border-r lg:px-8 lg:last:border-r-0 lg:first:pl-0 ${
                  i === principles.length - 1 ? "lg:pr-0" : ""
                }`}
              >
                <Icon className="h-5 w-5 text-ink" aria-hidden />
                <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
