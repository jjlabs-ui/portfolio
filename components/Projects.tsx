"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Globe, Star } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import {
  fetchGitHubProjectsClient,
  type GitHubProject,
} from "@/lib/github";
import { useI18n } from "@/lib/i18n";
import SplitReveal from "@/components/ui/SplitReveal";

export default function Projects({ projects }: { projects: GitHubProject[] }) {
  const root = useRef<HTMLElement>(null);
  const { lang, t } = useI18n();
  const tp = t.projects;
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [items, setItems] = useState<GitHubProject[]>(projects);

  // Refresh straight from GitHub on mount so a repo just made public shows up
  // immediately, without waiting for the server cache to revalidate.
  useEffect(() => {
    let alive = true;
    fetchGitHubProjectsClient().then((fresh) => {
      if (!alive || !fresh) return;
      setItems((current) => {
        const changed =
          fresh.length !== current.length ||
          fresh.some((p, i) => p.repoUrl !== current[i]?.repoUrl);
        if (changed) {
          // Layout changed — let ScrollTrigger recompute positions.
          requestAnimationFrame(() => ScrollTrigger.refresh());
          return fresh;
        }
        return current;
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  // Cursor-following preview (desktop, fine pointers, motion allowed only).
  useGSAP(
    (_ctx, contextSafe) => {
      const preview = previewRef.current;
      if (!preview || !contextSafe) return;
      if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches)
        return;

      setEnhanced(true);

      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });

      const onMove = contextSafe((e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      });

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  const enter = (index: number, e: React.MouseEvent) => {
    setActive(index);
    const preview = previewRef.current;
    if (enhanced && preview) {
      // Jump to the cursor immediately so the preview never flashes at 0,0.
      gsap.set(preview, { x: e.clientX, y: e.clientY });
      gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    }
  };

  const leave = () => {
    setActive(null);
    const preview = previewRef.current;
    if (enhanced && preview) {
      gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.35, ease: "power3.out" });
    }
  };

  // Line-grow separators on scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-project-line]").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 92%", once: true },
        });
      });
    },
    { scope: root, dependencies: [items.length] },
  );

  return (
    <section
      ref={root}
      id="projetos"
      aria-labelledby="projetos-title"
      className="relative py-[var(--space-section)]"
    >
      <div className="shell">
        <header className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">{tp.eyebrow}</p>
            <SplitReveal
              key={lang}
              as="h2"
              id="projetos-title"
              className="display text-[clamp(2rem,5vw,4rem)]"
              by="words"
            >
              {tp.title}
            </SplitReveal>
          </div>
          <span className="hidden font-mono text-xs text-muted sm:block">
            {String(items.length).padStart(2, "0")}{" "}
            {items.length === 1 ? tp.one : tp.many}
          </span>
        </header>

        <ul className="border-t border-line" role="list">
          {items.map((project, i) => (
            <li key={project.repoUrl}>
              <div data-project-line className="h-px w-full bg-line" />
              <div
                onMouseEnter={(e) => enter(i, e)}
                onMouseLeave={leave}
                onFocusCapture={() => setActive(i)}
                onBlurCapture={() => setActive(null)}
                className="group grid grid-cols-1 items-center gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10"
              >
                <span className="font-mono text-xs text-muted md:col-span-1">
                  {project.index}
                </span>

                <h3 className="md:col-span-4">
                  <a
                    href={project.homepage ?? project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-3xl font-medium tracking-tight transition-transform duration-500 ease-editorial group-hover:translate-x-2 md:text-4xl"
                  >
                    {project.name}
                  </a>
                </h3>

                <span className="text-sm text-muted md:col-span-3">
                  {project.description}
                </span>

                <span className="hidden items-center gap-3 font-mono text-xs text-muted md:col-span-1 md:flex">
                  {project.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent-blue" />
                      {project.language}
                    </span>
                  )}
                </span>

                {/* Actions: live site + repository */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-3 md:justify-end">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-sm text-ink"
                      aria-label={tp.visitAria(project.name)}
                    >
                      <Globe className="h-4 w-4" />
                      {tp.visit}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-ink"
                    aria-label={tp.repoAria(project.name)}
                  >
                    <Github className="h-4 w-4" />
                    {tp.repo}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                  {project.stars > 0 && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
                      <Star className="h-3 w-3" />
                      {project.stars}
                    </span>
                  )}
                </div>

                {/* Mobile inline preview */}
                <a
                  href={project.homepage ?? project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-2 block aspect-[2/1] w-full overflow-hidden bg-bg-alt md:hidden"
                  aria-hidden
                  tabIndex={-1}
                >
                  <Image
                    src={project.image}
                    alt={tp.previewAria(project.name)}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                </a>
              </div>
            </li>
          ))}
          <div className="h-px w-full bg-line" data-project-line />
        </ul>
      </div>

      {/* Desktop cursor-following preview */}
      {enhanced && (
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[500] hidden aspect-[2/1] w-[clamp(18rem,26vw,28rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-bg-alt shadow-[0_20px_60px_-20px_rgba(13,17,23,0.35)] md:block"
          style={{ opacity: 0 }}
        >
          {items.map((project, i) => (
            <Image
              key={project.repoUrl}
              src={project.image}
              alt=""
              fill
              sizes="28rem"
              className="object-cover transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0 }}
              unoptimized
            />
          ))}
        </div>
      )}
    </section>
  );
}
