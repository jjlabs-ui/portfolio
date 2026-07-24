"use client";

import { useI18n, type Lang } from "@/lib/i18n";

const options: { value: Lang; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
];

/**
 * Compact PT/EN language switcher. Two segmented buttons with a clear active
 * state, matching the editorial monospace styling used across the header.
 */
export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.header.langLabel}
      className={`inline-flex items-center border border-line font-mono text-xs ${className ?? ""}`}
    >
      {options.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={`px-2.5 py-1 tracking-wider transition-colors duration-300 ${
              active
                ? "bg-ink text-bg"
                : "text-muted hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
