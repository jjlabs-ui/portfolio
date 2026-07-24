"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

export default function Metrics() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();
  const metrics = t.metrics.items;

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>("[data-count]");

      nums.forEach((el) => {
        const target = Number(el.dataset.count);
        if (Number.isNaN(target)) return;

        if (prefersReducedMotion()) {
          el.textContent = String(target);
          return;
        }

        const counter = { val: 0 };
        gsap.fromTo(
          counter,
          { val: 0 },
          {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              once: true,
            },
            onStart: () => {
              el.textContent = "0";
            },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.val));
            },
            onComplete: () => {
              el.textContent = String(target);
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label={t.metrics.aria}
      className="bg-dark py-[clamp(4.5rem,9vw,8rem)] text-bg"
    >
      <div className="shell">
        <p className="mb-14 max-w-[36ch] text-base text-white/55">
          {t.metrics.lead}
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-3">
              <span className="display flex items-baseline text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-tight">
                <span data-count={metric.value}>{metric.value}</span>
                <span className="ml-0.5 text-[0.55em] text-accent-blue">
                  {metric.suffix}
                </span>
              </span>
              <span className="text-sm text-bg">{metric.label}</span>
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-white/40">
                {metric.hint}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
