"use client";

import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact() {
  const { lang, t } = useI18n();
  const c = t.contact;
  const whatsappHref = `${site.whatsapp.href}?text=${encodeURIComponent(c.whatsapp)}`;
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="bg-dark py-[var(--space-section)] text-bg"
    >
      <div className="shell">
        <p className="eyebrow mb-8 text-white/50">{c.eyebrow}</p>

        <SplitReveal
          key={lang}
          as="h2"
          id="contato-title"
          className="display max-w-[14ch] text-[clamp(2.5rem,8vw,7rem)]"
        >
          {c.title}
        </SplitReveal>

        <p className="mt-8 max-w-[46ch] text-lg text-white/60">
          {c.p}
        </p>

        <div className="mt-14 border-t border-white/15 pt-14">
          <Magnetic strength={0.2}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-tight"
            >
              {c.cta}
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/30 transition-all duration-500 ease-editorial group-hover:bg-bg group-hover:text-ink">
                <ArrowRight className="h-6 w-6 transition-transform duration-500 ease-editorial group-hover:translate-x-0.5" />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
