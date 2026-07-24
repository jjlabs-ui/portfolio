"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ScrollTrigger } from "@/lib/gsap";

export type Lang = "pt" | "en";

const STORAGE_KEY = "jp-lang";

/* -------------------------------------------------------------------------- */
/*  Dictionary                                                                */
/* -------------------------------------------------------------------------- */

const pt = {
  nav: [
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ],
  header: {
    available: "Disponível para projetos",
    toTop: "ir para o topo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    navMain: "Navegação principal",
    navMobile: "Navegação mobile",
    langLabel: "Idioma",
  },
  hero: {
    aria: "Introdução",
    quickInfo: "Informações rápidas",
    portfolio: "Portfolio",
    h: {
      lead: "Desenvolvo",
      em1: "experiências digitais",
      mid: "que unem",
      hl: "tecnologia",
      tail: "estratégia e",
      em2: "design",
    },
    subtitle:
      "Full Stack Developer especializado em sites, interfaces e sistemas web rápidos, modernos e pensados para gerar resultados.",
    ctaProjects: "Ver projetos",
    ctaTalk: "Falar comigo",
    baseLabel: "Base",
    baseValue: "Brasil",
    baseHint: "Atendimento remoto",
    specLabel: "Especialidade",
    specValue: "Full Stack",
    specHint: "Sites, interfaces e sistemas",
    statusLabel: "Status",
    statusValue: "Disponível",
    statusHint: "Aberto a novos projetos",
    scroll: "Scroll",
  },
  projects: {
    eyebrow: "Direto do GitHub",
    title: "Projetos selecionados",
    one: "projeto",
    many: "projetos",
    visit: "Acessar site",
    repo: "Repositório",
    visitAria: (name: string) => `Acessar o site online de ${name}`,
    repoAria: (name: string) => `Ver o repositório de ${name} no GitHub`,
    previewAria: (name: string) => `Prévia do repositório ${name}`,
  },
  about: {
    eyebrow: "Quem eu sou",
    hPrefix: "Sou o João Pedro. ",
    hEm: "Desenvolvedor Full Stack",
    hSuffix: " que transforma ideias em sites e sistemas de verdade.",
    p1: "Se você tem um projeto na cabeça, uma empresa para crescer ou um negócio que ainda não tem presença online, eu posso te ajudar. Planejo, desenho e desenvolvo a solução completa: site, landing page ou sistema web.",
    p2: "Cuido da experiência no celular e no computador, da velocidade, do SEO e da publicação. Você sai com um produto pronto para usar, rápido e profissional, feito para gerar resultado.",
    dl: [
      { dt: "O que faço", dd: "Sites e sistemas" },
      { dt: "Como trabalho", dd: "Do início ao fim" },
      { dt: "Para quem", dd: "Empresas e projetos" },
      { dt: "Onde", dd: "Brasil · Remoto" },
    ],
  },
  whyWeb: {
    eyebrow: "Por que ter um site",
    hPrefix: "Sem internet, o seu negócio ",
    hEm: "fica invisível.",
    lead: "Abrir a loja cedo e anunciar em grupo de WhatsApp ainda funciona. Mas isso é o passado. Hoje, quem não está online perde cliente todos os dias.",
    body1:
      "O mundo já funciona na tecnologia. Se você ainda não percebeu que a internet chegou para te ajudar, continua no mesmo ciclo: esforço demais e resultado de menos.",
    body2:
      "Com um site profissional, você vende para pessoas de outros estados, dá visibilidade ao seu projeto e abre portas que o presencial sozinho nunca vai alcançar. A internet é o futuro. E o futuro só cresce.",
    body3: "Melhor acelerar agora do que correr atrás depois.",
    quote:
      "“Quem chega cedo é lembrado. Quem chega tarde disputa o resto.”",
    quoteCaption:
      "Leve o futuro para a sua empresa ou projeto hoje. Cada dia offline é um dia a menos de crescimento.",
    points: [
      {
        index: "01",
        title: "Venda além da sua cidade",
        text: "Seu produto para de depender só da vizinhança. Com um site, você alcança clientes de outros bairros, estados e até países. Todo dia, a qualquer hora.",
      },
      {
        index: "02",
        title: "Seja encontrado de verdade",
        text: "Anúncio em grupo some no feed. Um site bem feito aparece no Google, no celular e na memória de quem precisa do que você oferece.",
      },
      {
        index: "03",
        title: "Transmita confiança",
        text: "Quem chega primeiro é lembrado. Uma presença digital clara mostra que o seu negócio é sério e está preparado para crescer.",
      },
    ],
    ctaText:
      "Tem um projeto, uma loja ou uma ideia? Eu construo a presença digital que o seu negócio precisa.",
    ctaButton: "Quero um site para o meu negócio",
    whatsapp: "Olá, João Pedro! Quero levar meu negócio para a internet.",
  },
  services: {
    eyebrow: "Serviços",
    title: "O que eu desenvolvo",
    intro:
      "Do primeiro rascunho ao deploy. Soluções sob medida para cada tipo de projeto digital.",
    note: "Sites e landing pages podem ser entregues em open source (código seu) ou licença (eu cuido de tudo). Sistemas, dashboards e e-commerce são feitos por licença, pela complexidade e manutenção envolvidas.",
    modelOpen: "Open source",
    modelLicenca: "Licença",
    items: [
      {
        index: "01",
        title: "Websites institucionais",
        description:
          "Presença digital sólida, rápida e alinhada à identidade da sua marca.",
        models: ["open", "licenca"],
        timeline: "10 a 20 dias",
      },
      {
        index: "02",
        title: "Landing pages",
        description:
          "Páginas focadas em conversão, com copy, estrutura e velocidade otimizadas.",
        models: ["open", "licenca"],
        timeline: "5 a 10 dias",
      },
      {
        index: "03",
        title: "Sistemas web",
        description:
          "Aplicações completas, do backend à interface, pensadas para escalar.",
        models: ["licenca"],
        timeline: "A combinar",
      },
      {
        index: "04",
        title: "Dashboards",
        description:
          "Painéis de dados claros, com visualizações úteis e boa performance.",
        models: ["licenca"],
        timeline: "15 a 30 dias",
      },
      {
        index: "05",
        title: "E-commerce",
        description:
          "Lojas rápidas e seguras, com checkout fluido e gestão simplificada.",
        models: ["licenca"],
        timeline: "20 a 40 dias",
      },
      {
        index: "06",
        title: "Otimização de performance",
        description:
          "Core Web Vitals, tempo de carregamento e experiência de uso afinados.",
        models: ["licenca"],
        timeline: "3 a 7 dias",
      },
      {
        index: "07",
        title: "SEO técnico",
        description:
          "Estrutura semântica, metadados e indexação preparados para ranquear.",
        models: ["open", "licenca"],
        timeline: "3 a 7 dias",
      },
      {
        index: "08",
        title: "Manutenção e suporte",
        description:
          "Acompanhamento contínuo, correções e evolução do seu produto digital.",
        models: ["licenca"],
        timeline: "Mensal",
      },
    ],
  },
  workModels: {
    eyebrow: "Como contratar",
    title: "Dois modelos de trabalho",
    subtitle:
      "Você escolhe como quer trabalhar comigo. Ambos com o mesmo cuidado no desenvolvimento.",
    items: [
      {
        tag: "Licença",
        icon: "shield",
        title: "Eu cuido de tudo",
        description:
          "Você contrata a licença do projeto e fica livre da parte técnica. Eu cuido do desenvolvimento, da publicação, das atualizações, da manutenção e do suporte. A hospedagem e o domínio (URL) anuais ficam por conta do cliente.",
        points: [
          "Desenvolvimento completo",
          "Publicação e configuração",
          "Manutenção e atualizações",
          "Suporte contínuo",
          "Hospedagem e domínio anual por conta do cliente",
        ],
      },
      {
        tag: "Open source",
        icon: "code",
        title: "O código é seu",
        description:
          "Entrego o projeto com o código-fonte aberto e a responsabilidade passa a ser sua. Você fica dono de tudo: hospedagem, manutenção e evolução ficam por conta do cliente. Ideal para quem tem equipe própria ou quer total autonomia.",
        points: [
          "Código-fonte entregue",
          "Total autonomia",
          "Responsabilidade do cliente",
          "Sem custo recorrente",
        ],
      },
    ],
    ctaText:
      "Não sabe qual modelo escolher? Me conta sobre o seu projeto que eu te ajudo a decidir.",
    ctaButton: "Falar sobre o meu projeto",
    whatsapp:
      "Olá, João Pedro! Quero entender qual modelo de trabalho é melhor para o meu projeto.",
  },
  stack: {
    eyebrow: "Ferramentas",
    title: "Stack e ferramentas",
  },
  process: {
    eyebrow: "Processo",
    title: "Como o seu projeto acontece",
    intro:
      "Orçamento claro, prazo combinado, você acompanhando cada etapa e a entrega no ar. Clique em cada fase para ver os detalhes.",
    step: "Etapa",
    steps: [
      {
        index: "01",
        title: "Orçamento",
        summary:
          "Analiso o que você precisa, o escopo e o prazo. Em seguida monto um orçamento claro, sem surpresas.",
        detail:
          "Conversamos pelo WhatsApp sobre o objetivo do projeto. Defino o que entra, o que fica de fora e o valor fechado antes de começar.",
        meta: "Resposta em até 24h",
      },
      {
        index: "02",
        title: "Prazo",
        summary:
          "Combinamos os dias de trabalho de acordo com a complexidade. Você sabe desde o início quando o site fica pronto.",
        detail:
          "Landing page: cerca de 5 a 10 dias. Site institucional: 10 a 20 dias. Sistema web: conforme o escopo. Sempre com data combinada.",
        meta: "5 a 20 dias úteis",
      },
      {
        index: "03",
        title: "Atualização",
        summary:
          "Durante o desenvolvimento, você acompanha o andamento. Mostro o progresso e ajusto o que for necessário.",
        detail:
          "Envio previews, print ou link de teste. Você valida cada etapa. Nada de sumir e só voltar no final.",
        meta: "Updates a cada 2 a 3 dias",
      },
      {
        index: "04",
        title: "Entrega",
        summary:
          "Publico o site no ar, testado no celular e no computador. Passo o acesso e fico disponível para suporte.",
        detail:
          "Deploy, domínio, responsividade e revisão final. Você recebe tudo funcionando, com orientação de uso e suporte pós-entrega.",
        meta: "No ar + suporte",
      },
    ],
  },
  metrics: {
    lead: "Números que mostram o resultado do trabalho. Projetos entregues, clientes satisfeitos e compromisso com o prazo.",
    aria: "Resultados",
    items: [
      { value: 28, suffix: "+", label: "Projetos entregues", hint: "Sites e sistemas" },
      { value: 22, suffix: "+", label: "Clientes satisfeitos", hint: "Com retorno positivo" },
      { value: 98, suffix: "%", label: "Entregas no prazo", hint: "Dentro do combinado" },
      { value: 100, suffix: "%", label: "Suporte incluso", hint: "Após a publicação" },
    ],
  },
  siteNote: {
    eyebrow: "Sobre este site",
    hPrefix: "Este site já é uma ",
    hEm: "amostra",
    hSuffix: " do meu trabalho.",
    p1: "Nada aqui é template pronto. Cada seção foi pensada do zero: da tipografia ao espaçamento, do movimento à forma como a informação chega até você.",
    p2: "A estratégia é simples: clareza e confiança. Um visual limpo, preto no branco, que coloca a mensagem em primeiro lugar e mostra, na prática, o nível de cuidado que aplico em cada projeto.",
    priceLabel: "Quanto vale um site assim",
    priceValue: "A partir de R$ 2.500",
    priceHint:
      "Valor de exemplo. O investimento varia conforme escopo, número de páginas, animações e funcionalidades.",
    builtWith: "Construído com",
    principles: [
      {
        icon: "gauge",
        title: "Performance",
        text: "Carregamento rápido, imagens otimizadas e código enxuto. Um site lento perde cliente antes mesmo de abrir.",
      },
      {
        icon: "search",
        title: "SEO",
        text: "Estrutura semântica, metadados e Open Graph prontos para o Google e para o compartilhamento em redes.",
      },
      {
        icon: "accessibility",
        title: "Acessibilidade",
        text: "Navegação por teclado, bom contraste e respeito às preferências de movimento de cada pessoa.",
      },
      {
        icon: "sparkles",
        title: "Experiência",
        text: "Animações discretas, scroll suave e composição editorial que transmitem seriedade e confiança.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    title: "Tem um projeto em mente?",
    p: "Vamos transformar sua ideia em uma experiência digital rápida, profissional e memorável.",
    cta: "Entrar em contato via WhatsApp para fazer seu projeto",
    whatsapp: "Olá, João Pedro! Tenho um projeto em mente e gostaria de conversar.",
  },
  footer: {
    rights: "Todos os direitos reservados.",
  },
};

export type Dict = typeof pt;

const en: Dict = {
  nav: [
    { label: "Projects", href: "#projetos" },
    { label: "About", href: "#sobre" },
    { label: "Services", href: "#servicos" },
    { label: "Contact", href: "#contato" },
  ],
  header: {
    available: "Available for projects",
    toTop: "go to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navMain: "Main navigation",
    navMobile: "Mobile navigation",
    langLabel: "Language",
  },
  hero: {
    aria: "Intro",
    quickInfo: "Quick info",
    portfolio: "Portfolio",
    h: {
      lead: "I build",
      em1: "digital experiences",
      mid: "that blend",
      hl: "technology",
      tail: "strategy and",
      em2: "design",
    },
    subtitle:
      "Full Stack Developer specialized in fast, modern websites, interfaces and web systems built to drive real results.",
    ctaProjects: "View projects",
    ctaTalk: "Let's talk",
    baseLabel: "Based in",
    baseValue: "Brazil",
    baseHint: "Working remotely",
    specLabel: "Expertise",
    specValue: "Full Stack",
    specHint: "Sites, interfaces and systems",
    statusLabel: "Status",
    statusValue: "Available",
    statusHint: "Open to new projects",
    scroll: "Scroll",
  },
  projects: {
    eyebrow: "Straight from GitHub",
    title: "Selected projects",
    one: "project",
    many: "projects",
    visit: "Visit site",
    repo: "Repository",
    visitAria: (name: string) => `Visit ${name} live site`,
    repoAria: (name: string) => `View ${name} repository on GitHub`,
    previewAria: (name: string) => `Preview of the ${name} repository`,
  },
  about: {
    eyebrow: "Who I am",
    hPrefix: "I'm João Pedro. A ",
    hEm: "Full Stack Developer",
    hSuffix: " who turns ideas into real websites and systems.",
    p1: "If you have a project in mind, a company to grow or a business with no online presence yet, I can help. I plan, design and build the complete solution: website, landing page or web system.",
    p2: "I take care of the mobile and desktop experience, speed, SEO and launch. You walk away with a ready-to-use product, fast and professional, built to deliver results.",
    dl: [
      { dt: "What I do", dd: "Sites and systems" },
      { dt: "How I work", dd: "End to end" },
      { dt: "For whom", dd: "Companies and projects" },
      { dt: "Where", dd: "Brazil · Remote" },
    ],
  },
  whyWeb: {
    eyebrow: "Why you need a website",
    hPrefix: "Without the internet, your business ",
    hEm: "stays invisible.",
    lead: "Opening the shop early and posting in WhatsApp groups still works. But that's the past. Today, whoever isn't online loses customers every single day.",
    body1:
      "The world already runs on technology. If you still haven't realized the internet is here to help you, you stay in the same loop: too much effort, too little return.",
    body2:
      "With a professional website you sell to people in other regions, give your project visibility and open doors that being local alone will never reach. The internet is the future. And the future only grows.",
    body3: "Better to speed up now than to play catch-up later.",
    quote:
      "“Those who arrive early are remembered. Those who arrive late fight over the rest.”",
    quoteCaption:
      "Bring the future to your company or project today. Every day offline is a day less of growth.",
    points: [
      {
        index: "01",
        title: "Sell beyond your city",
        text: "Your product stops depending only on the neighborhood. With a website, you reach customers in other areas, regions and even countries. Every day, at any hour.",
      },
      {
        index: "02",
        title: "Get truly found",
        text: "A group post disappears in the feed. A well-built website shows up on Google, on phones and in the memory of whoever needs what you offer.",
      },
      {
        index: "03",
        title: "Convey trust",
        text: "Whoever comes first is remembered. A clear digital presence shows your business is serious and ready to grow.",
      },
    ],
    ctaText:
      "Have a project, a store or an idea? I build the digital presence your business needs.",
    ctaButton: "I want a website for my business",
    whatsapp: "Hi, João Pedro! I want to bring my business online.",
  },
  services: {
    eyebrow: "Services",
    title: "What I build",
    intro:
      "From the first draft to deploy. Tailor-made solutions for every kind of digital project.",
    note: "Websites and landing pages can be delivered as open source (your code) or license (I handle everything). Systems, dashboards and e-commerce are done by license, given the complexity and maintenance involved.",
    modelOpen: "Open source",
    modelLicenca: "License",
    items: [
      {
        index: "01",
        title: "Business websites",
        description:
          "A solid, fast digital presence aligned with your brand identity.",
        models: ["open", "licenca"],
        timeline: "10 to 20 days",
      },
      {
        index: "02",
        title: "Landing pages",
        description:
          "Conversion-focused pages with optimized copy, structure and speed.",
        models: ["open", "licenca"],
        timeline: "5 to 10 days",
      },
      {
        index: "03",
        title: "Web systems",
        description:
          "Complete applications, from backend to interface, built to scale.",
        models: ["licenca"],
        timeline: "Custom",
      },
      {
        index: "04",
        title: "Dashboards",
        description:
          "Clear data panels with useful visualizations and solid performance.",
        models: ["licenca"],
        timeline: "15 to 30 days",
      },
      {
        index: "05",
        title: "E-commerce",
        description:
          "Fast, secure stores with a smooth checkout and simple management.",
        models: ["licenca"],
        timeline: "20 to 40 days",
      },
      {
        index: "06",
        title: "Performance optimization",
        description:
          "Core Web Vitals, load time and user experience finely tuned.",
        models: ["licenca"],
        timeline: "3 to 7 days",
      },
      {
        index: "07",
        title: "Technical SEO",
        description:
          "Semantic structure, metadata and indexing ready to rank.",
        models: ["open", "licenca"],
        timeline: "3 to 7 days",
      },
      {
        index: "08",
        title: "Maintenance & support",
        description:
          "Ongoing follow-up, fixes and evolution of your digital product.",
        models: ["licenca"],
        timeline: "Monthly",
      },
    ],
  },
  workModels: {
    eyebrow: "How to hire",
    title: "Two ways to work",
    subtitle:
      "You choose how you want to work with me. Both with the same care in development.",
    items: [
      {
        tag: "License",
        icon: "shield",
        title: "I handle everything",
        description:
          "You license the project and stay free from the technical side. I take care of development, launch, updates, maintenance and support. The annual hosting and domain (URL) are covered by the client.",
        points: [
          "Complete development",
          "Launch and setup",
          "Maintenance and updates",
          "Ongoing support",
          "Annual hosting and domain covered by the client",
        ],
      },
      {
        tag: "Open source",
        icon: "code",
        title: "The code is yours",
        description:
          "I deliver the project with open source code and the responsibility becomes yours. You own everything: hosting, maintenance and evolution are on the client. Ideal for those with their own team or who want full autonomy.",
        points: [
          "Source code delivered",
          "Full autonomy",
          "Client responsibility",
          "No recurring cost",
        ],
      },
    ],
    ctaText:
      "Not sure which model to choose? Tell me about your project and I'll help you decide.",
    ctaButton: "Talk about my project",
    whatsapp:
      "Hi, João Pedro! I'd like to understand which work model is best for my project.",
  },
  stack: {
    eyebrow: "Tools",
    title: "Stack & tools",
  },
  process: {
    eyebrow: "Process",
    title: "How your project happens",
    intro:
      "Clear quote, agreed deadline, you following every step and the delivery live. Click each phase to see the details.",
    step: "Step",
    steps: [
      {
        index: "01",
        title: "Quote",
        summary:
          "I analyze what you need, the scope and the deadline. Then I put together a clear quote, no surprises.",
        detail:
          "We chat on WhatsApp about the project's goal. I define what's in, what's out and the fixed price before starting.",
        meta: "Reply within 24h",
      },
      {
        index: "02",
        title: "Timeline",
        summary:
          "We agree on the working days based on complexity. You know from the start when the site will be ready.",
        detail:
          "Landing page: around 5 to 10 days. Business website: 10 to 20 days. Web system: depending on scope. Always with an agreed date.",
        meta: "5 to 20 business days",
      },
      {
        index: "03",
        title: "Updates",
        summary:
          "During development, you follow the progress. I show what's done and adjust whatever is needed.",
        detail:
          "I send previews, screenshots or a test link. You validate each step. No disappearing and only showing up at the end.",
        meta: "Updates every 2 to 3 days",
      },
      {
        index: "04",
        title: "Delivery",
        summary:
          "I publish the site live, tested on mobile and desktop. I hand over access and stay available for support.",
        detail:
          "Deploy, domain, responsiveness and final review. You receive everything working, with usage guidance and post-delivery support.",
        meta: "Live + support",
      },
    ],
  },
  metrics: {
    lead: "Numbers that show the result of the work. Projects delivered, satisfied clients and commitment to deadlines.",
    aria: "Results",
    items: [
      { value: 28, suffix: "+", label: "Projects delivered", hint: "Sites and systems" },
      { value: 22, suffix: "+", label: "Satisfied clients", hint: "With positive feedback" },
      { value: 98, suffix: "%", label: "On-time delivery", hint: "Within the agreed date" },
      { value: 100, suffix: "%", label: "Support included", hint: "After launch" },
    ],
  },
  siteNote: {
    eyebrow: "About this site",
    hPrefix: "This site is already a ",
    hEm: "sample",
    hSuffix: " of my work.",
    p1: "Nothing here is an off-the-shelf template. Every section was thought out from scratch: from typography to spacing, from motion to the way information reaches you.",
    p2: "The strategy is simple: clarity and trust. A clean look, black on white, that puts the message first and shows, in practice, the level of care I apply to every project.",
    priceLabel: "What a site like this is worth",
    priceValue: "From R$ 2,500",
    priceHint:
      "Example figure. The investment varies with scope, number of pages, animations and features.",
    builtWith: "Built with",
    principles: [
      {
        icon: "gauge",
        title: "Performance",
        text: "Fast loading, optimized images and lean code. A slow site loses customers before it even opens.",
      },
      {
        icon: "search",
        title: "SEO",
        text: "Semantic structure, metadata and Open Graph ready for Google and social sharing.",
      },
      {
        icon: "accessibility",
        title: "Accessibility",
        text: "Keyboard navigation, good contrast and respect for each person's motion preferences.",
      },
      {
        icon: "sparkles",
        title: "Experience",
        text: "Subtle animations, smooth scroll and an editorial composition that convey seriousness and trust.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a project in mind?",
    p: "Let's turn your idea into a fast, professional and memorable digital experience.",
    cta: "Get in touch on WhatsApp to start your project",
    whatsapp: "Hi, João Pedro! I have a project in mind and I'd like to talk.",
  },
  footer: {
    rights: "All rights reserved.",
  },
};

const dictionaries: Record<Lang, Dict> = { pt, en };

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  const mounted = useRef(false);

  // Pick up a stored preference (or the browser language) on first mount.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "pt" || stored === "en") {
      setLangState(stored);
    } else if (typeof navigator !== "undefined") {
      setLangState(navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en");
    }
  }, []);

  // Keep <html lang> in sync and recompute scroll positions after a swap.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    if (mounted.current) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      mounted.current = true;
    }
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggle = () => setLang(lang === "pt" ? "en" : "pt");

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
