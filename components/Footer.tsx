"use client";

import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-dark pb-10 text-bg">
      <div className="shell flex items-center justify-center border-t border-white/15 pt-8 text-sm text-white/50">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
