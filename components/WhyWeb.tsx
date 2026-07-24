"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export default function WhyWeb() {
  const root = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const w = t.whyWeb;
  const points = w.points;
  const whatsappHref = `${site.whatsapp.href}?text=${encodeURIComponent(w.whatsapp)}`;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-why-point]").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.85,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="por-que-um-site"
      aria-labelledby="why-title"
      className="border-t border-line bg-bg py-[var(--space-section)]"
    >
      <div className="shell">
        {/* Opening: big statement that stops the scroll */}
        <header>
          <p className="eyebrow mb-8">{w.eyebrow}</p>
          <SplitReveal
            key={lang}
            as="h2"
            id="why-title"
            className="display max-w-[16ch] text-[clamp(2.4rem,6.5vw,5.5rem)]"
          >
            {w.hPrefix}
            <em className="font-serif italic">{w.hEm}</em>
          </SplitReveal>
        </header>

        <FadeIn
          as="p"
          className="mt-10 max-w-[40ch] text-xl leading-relaxed text-muted md:text-2xl"
        >
          {w.lead}
        </FadeIn>

        {/* Body: narrative + pull quote */}
        <div className="mt-16 grid gap-12 border-t border-line pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 lg:col-span-7">
            <FadeIn as="p" className="text-lg leading-[1.75] text-ink md:text-xl">
              {w.body1}
            </FadeIn>
            <FadeIn
              as="p"
              delay={0.06}
              className="text-lg leading-[1.75] text-ink md:text-xl"
            >
              {w.body2}
            </FadeIn>
            <FadeIn
              as="p"
              delay={0.1}
              className="text-lg font-medium leading-[1.75] text-ink md:text-xl"
            >
              {w.body3}
            </FadeIn>
          </div>

          <FadeIn
            delay={0.08}
            className="flex flex-col justify-between gap-10 lg:col-span-5"
          >
            <blockquote className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] italic leading-[1.25] text-ink">
              {w.quote}
            </blockquote>
            <p className="max-w-[28ch] text-sm leading-relaxed text-muted">
              {w.quoteCaption}
            </p>
          </FadeIn>
        </div>

        {/* Three reasons */}
        <ul
          className="mt-20 grid gap-0 border-t border-line md:grid-cols-3"
          role="list"
        >
          {points.map((point) => (
            <li
              key={point.index}
              data-why-point
              className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="font-mono text-xs text-muted">{point.index}</span>
              <h3 className="mt-5 text-2xl font-medium tracking-tight md:text-[1.65rem]">
                {point.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {point.text}
              </p>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <FadeIn className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:border-t sm:border-line sm:pt-10">
          <p className="max-w-[36ch] text-lg text-muted">
            {w.ctaText}
          </p>
          <Magnetic strength={0.25}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 text-sm text-bg transition-colors duration-300 hover:bg-transparent hover:text-ink"
            >
              {w.ctaButton}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </FadeIn>
      </div>
    </section>
  );
}
