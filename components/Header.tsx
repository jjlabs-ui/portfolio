"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import Magnetic from "@/components/ui/Magnetic";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();
  const nav = t.nav;

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 40,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > 40),
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  });

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled={scrolled}
        className="fixed inset-x-0 top-0 z-[9000] border-b border-line/60 transition-[height,background-color,backdrop-filter] duration-500 ease-editorial data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/70 data-[scrolled=true]:backdrop-blur-md"
        style={{ height: scrolled ? 60 : 76 }}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <a
            href="#top"
            onClick={(e) => handleNav(e, "#top")}
            className="font-mono text-sm font-medium tracking-tight"
            aria-label={`${site.name}, ${t.header.toTop}`}
            data-cursor="hover"
          >
            JoãoPedro<span className="text-muted">.</span>Dev
          </a>

          <nav
            aria-label={t.header.navMain}
            className="hidden items-center gap-8 md:flex"
          >
            {nav.map((item) => (
              <Magnetic key={item.href} strength={0.25}>
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="relative text-sm text-muted transition-colors duration-300 hover:text-ink"
                  data-cursor="hover"
                >
                  {item.label}
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              <span className="font-mono text-xs tracking-tight text-muted">
                {t.header.available}
              </span>
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex flex-col items-end gap-1.5"
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            >
            <span
              className="block h-px bg-ink transition-all duration-300 ease-editorial"
              style={{
                width: 24,
                transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px bg-ink transition-all duration-300 ease-editorial"
              style={{
                width: menuOpen ? 24 : 16,
                transform: menuOpen ? "translateY(-3px) rotate(-45deg)" : "none",
              }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[8999] flex flex-col justify-between bg-bg px-[var(--shell-padding)] pb-10 pt-28 md:hidden"
          >
            <nav aria-label={t.header.navMobile} className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line py-5 text-3xl font-medium tracking-tight"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              <span className="font-mono text-xs tracking-tight text-muted">
                {t.header.available}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
