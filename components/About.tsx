"use client";

import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function About() {
  const { lang, t } = useI18n();
  const a = t.about;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="border-t border-line bg-bg-alt py-[var(--space-section)]"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-8">{a.eyebrow}</p>
          <SplitReveal
            key={lang}
            as="h2"
            id="sobre-title"
            className="display max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.75rem)]"
          >
            {a.hPrefix}
            <em className="font-serif italic">{a.hEm}</em>
            {a.hSuffix}
          </SplitReveal>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-1">
          <FadeIn as="p" className="text-lg leading-relaxed text-muted">
            {a.p1}
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.08}
            className="text-lg leading-relaxed text-muted"
          >
            {a.p2}
          </FadeIn>

          <FadeIn delay={0.12}>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-8 font-mono text-xs uppercase tracking-wider">
              {a.dl.map((item) => (
                <div key={item.dt}>
                  <dt className="text-muted">{item.dt}</dt>
                  <dd className="mt-2 text-ink">{item.dd}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
