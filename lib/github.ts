import { projects as fallbackProjects } from "@/lib/site";

/** GitHub account whose public repositories power the Projects section. */
export const GITHUB_USER = "jjlabs-ui";

export type GitHubProject = {
  index: string;
  name: string;
  description: string;
  language: string | null;
  topics: string[];
  stars: number;
  year: string;
  /** Live site URL (GitHub "website" field or a domain found in the bio). */
  homepage: string | null;
  repoUrl: string;
  /** GitHub-generated social preview image for the repo. */
  image: string;
};

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  owner: { login: string };
};

function prettify(name: string): string {
  return name
    .replace(/[-_.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Resolves the live site URL: prefer the repo's "website" field; otherwise try
 * to detect a domain mentioned in the description (e.g. "jjxvnz.bio").
 */
function resolveHomepage(
  homepage: string | null,
  description: string | null,
): string | null {
  if (homepage?.trim()) return normalizeUrl(homepage);
  const match = description?.match(
    /((?:https?:\/\/)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:bio|com|dev|app|io|net|org|me|co|gg|xyz|site|tech)(?:\.br)?(?:\/[^\s]*)?)/i,
  );
  return match ? normalizeUrl(match[1]) : null;
}

function ogImage(owner: string, repo: string, cacheKey: number): string {
  // First path segment is an arbitrary cache-buster; using the last push time
  // means the preview refreshes whenever the repo changes.
  return `https://opengraph.githubassets.com/${cacheKey}/${owner}/${repo}`;
}

function fromFallback(): GitHubProject[] {
  return fallbackProjects.map((p) => ({
    index: p.index,
    name: p.name,
    description: p.category,
    language: p.tech[0] ?? null,
    topics: p.tech,
    stars: 0,
    year: p.year,
    homepage: null,
    repoUrl: p.href,
    image: p.image,
  }));
}

/** Pure transform from raw GitHub repos into the UI project shape. */
export function mapReposToProjects(repos: Repo[]): GitHubProject[] {
  return repos
    .filter((r) => !r.fork && !r.archived)
    // Skip the profile repo (named after the user) — it's not a project.
    .filter((r) => r.name.toLowerCase() !== r.owner.login.toLowerCase())
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count)
        return b.stargazers_count - a.stargazers_count;
      return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
    })
    .map<GitHubProject>((r, i) => ({
      index: String(i + 1).padStart(2, "0"),
      name: prettify(r.name),
      description: r.description?.trim() || "Repositório open source",
      language: r.language,
      topics: r.topics ?? [],
      stars: r.stargazers_count,
      year: new Date(r.pushed_at).getFullYear().toString(),
      homepage: resolveHomepage(r.homepage, r.description),
      repoUrl: r.html_url,
      image: ogImage(r.owner.login, r.name, Date.parse(r.pushed_at)),
    }));
}

const REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

/**
 * Server-side fetch used for the initial render. Revalidates frequently so new
 * repos surface automatically, and falls back to the curated list on failure.
 */
export async function getGitHubProjects(): Promise<{
  projects: GitHubProject[];
  source: "github" | "fallback";
}> {
  try {
    const res = await fetch(REPOS_ENDPOINT, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": GITHUB_USER,
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);

    const projects = mapReposToProjects((await res.json()) as Repo[]);
    if (projects.length === 0) return { projects: fromFallback(), source: "fallback" };
    return { projects, source: "github" };
  } catch {
    return { projects: fromFallback(), source: "fallback" };
  }
}

/**
 * Client-side fetch used to refresh the list on every visit, so a repo made
 * public moments ago appears without waiting for the server cache to expire.
 * Returns null on any failure (the SSR list stays in place).
 */
export async function fetchGitHubProjectsClient(): Promise<GitHubProject[] | null> {
  try {
    const res = await fetch(REPOS_ENDPOINT, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const projects = mapReposToProjects((await res.json()) as Repo[]);
    return projects.length > 0 ? projects : null;
  } catch {
    return null;
  }
}
