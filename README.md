# João Pedro — Portfólio

Portfólio profissional de **João Pedro**, Full Stack & Web Developer. Direção
visual editorial e monocromática (inspirada em GitHub, Linear e Vercel), com
animações sofisticadas e discretas.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (tipagem completa)
- **Tailwind CSS** + CSS variables para tokens de cor, espaçamento e tipografia
- **GSAP** + **ScrollTrigger** (animações e scroll)
- **Lenis** (smooth scrolling, sincronizado ao ticker do GSAP)
- **SplitType** (reveal de textos por linhas/palavras)
- **Framer Motion** (apenas micro-interações — menu mobile)
- **Lucide React** (ícones)
- **next/font** (Geist Sans, Geist Mono, Instrument Serif)

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (http://localhost:3000)
npm run build    # build de produção
npm run start    # servir o build
npm run lint     # checagem de lint
```

## Estrutura

```
app/
  layout.tsx          # fontes, metadata, OpenGraph, providers globais
  page.tsx            # composição das seções + JSON-LD
  globals.css         # design tokens + estilos base
  robots.ts           # robots.txt
  sitemap.ts          # sitemap.xml
  icon.svg            # favicon
components/
  providers/          # SmoothScroll (Lenis), Cursor, ScrollProgress
  ui/                 # Magnetic, SplitReveal, FadeIn (reutilizáveis)
  Preloader, Header, Hero, Projects, About, Services,
  Stack, Process, Metrics, Contact, Footer
lib/
  gsap.ts             # registro de plugins + helper de reduced-motion
  site.ts             # conteúdo (projetos, serviços, stack, métricas...)
public/
  projects/*.svg      # mockups editoriais dos projetos (placeholders)
  opengraph-image.svg # imagem de compartilhamento social
```

## Personalização

Todo o conteúdo textual e de contato fica em [`lib/site.ts`](lib/site.ts):
nome, e-mail, WhatsApp, GitHub, LinkedIn, projetos, serviços, stack, etapas do
processo e métricas. As métricas usam **placeholders** fáceis de editar.

Substitua os SVGs em `public/projects/` pelas imagens ou vídeos reais dos
projetos e atualize `site.url` para o domínio final (usado em metadata,
sitemap e robots).

## Acessibilidade & performance

- HTML semântico, navegação por teclado e `:focus-visible` visível.
- Respeita `prefers-reduced-motion`: animações e cursor customizado são
  desativados.
- Efeitos pesados (cursor magnético/flutuante) só rodam em ponteiros finos
  (desktop).
- Todas as animações GSAP usam `useGSAP()` / `gsap.context()` com limpeza
  automática ao desmontar.
- Imagens via `next/image` com `lazy loading` e formatos modernos.
