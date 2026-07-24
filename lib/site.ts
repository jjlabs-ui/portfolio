export const site = {
  name: "João Pedro",
  role: "Full Stack Developer",
  year: 2026,
  location: "Brasil",
  status: "Available",
  url: "https://joaopedro.dev",
  email: "contato@joaopedro.dev",
  whatsapp: {
    label: "+55 (67) 99660-4285",
    href: "https://wa.me/5567996604285",
  },
  github: {
    label: "github.com/jjlabs-ui",
    href: "https://github.com/jjlabs-ui",
  },
  linkedin: {
    label: "linkedin.com/in/joaopedro",
    href: "https://www.linkedin.com/in/joaopedro",
  },
} as const;

export const nav = [
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
] as const;

export type Project = {
  index: string;
  name: string;
  category: string;
  tech: string[];
  year: string;
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Gol de Cristo",
    category: "Plataforma esportiva",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    year: "2025",
    image: "/projects/gol-de-cristo.svg",
    href: "#",
  },
  {
    index: "02",
    name: "Landing Page SaaS",
    category: "Marketing / Conversão",
    tech: ["React", "Tailwind CSS", "GSAP", "Vercel"],
    year: "2025",
    image: "/projects/landing-saas.svg",
    href: "#",
  },
  {
    index: "03",
    name: "Dashboard Administrativo",
    category: "Aplicação web",
    tech: ["Next.js", "Node.js", "MongoDB", "Docker"],
    year: "2024",
    image: "/projects/dashboard.svg",
    href: "#",
  },
  {
    index: "04",
    name: "Plataforma de Agendamentos",
    category: "Produto / SaaS",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma"],
    year: "2024",
    image: "/projects/agendamentos.svg",
    href: "#",
  },
];

export type ServiceModel = "open" | "licenca";

export type Service = {
  index: string;
  title: string;
  description: string;
  /** Modelos de contratação disponíveis para este serviço. */
  models: ServiceModel[];
  /** Prazo estimado de entrega. */
  timeline: string;
};

export const modelLabels: Record<ServiceModel, string> = {
  open: "Open source",
  licenca: "Licença",
};

export const services: Service[] = [
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
];

export const stack = [
  { name: "React", weight: "xl" },
  { name: "Next.js", weight: "xl" },
  { name: "TypeScript", weight: "lg" },
  { name: "JavaScript", weight: "md" },
  { name: "Node.js", weight: "lg" },
  { name: "Tailwind CSS", weight: "md" },
  { name: "PostgreSQL", weight: "md" },
  { name: "MongoDB", weight: "sm" },
  { name: "Prisma", weight: "sm" },
  { name: "Git", weight: "sm" },
  { name: "Vercel", weight: "md" },
  { name: "Docker", weight: "sm" },
  { name: "GSAP", weight: "lg" },
  { name: "Figma", weight: "sm" },
] as const;

export type ProcessStep = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  meta: string;
};

export const processSteps: ProcessStep[] = [
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
];

export type Metric = {
  value: number;
  suffix: string;
  label: string;
  hint: string;
};

export const metrics: Metric[] = [
  { value: 28, suffix: "+", label: "Projetos entregues", hint: "Sites e sistemas" },
  { value: 22, suffix: "+", label: "Clientes satisfeitos", hint: "Com retorno positivo" },
  { value: 98, suffix: "%", label: "Entregas no prazo", hint: "Dentro do combinado" },
  { value: 100, suffix: "%", label: "Suporte incluso", hint: "Após a publicação" },
];
