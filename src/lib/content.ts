import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { parse as parseToml } from "@iarna/toml";

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");
const MENU_DIR = path.join(ROOT_DIR, "src", "config", "menus");
const EXAMPLES_DIR = path.join(ROOT_DIR, "src", "examples", "hugo-layouts");

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }

      return hljs.highlightAuto(code).value;
    },
  }),
);

type MenuItem = {
  name?: string;
  url?: string;
  weight?: number;
  post?: string;
};

type MenuGroups = {
  docs: MenuItem[];
  global: MenuItem[];
};

export type SitePage = {
  filePath: string;
  routeSegments: string[];
  routePath: string;
  lang: string;
  slug: string;
  title: string;
  description: string;
  html: string;
  body: string;
  isIndex: boolean;
  section: string | null;
  data: Record<string, any>;
};

export type LanguageOption = {
  code: string;
  label: string;
  url: string;
  active: boolean;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function readIfExists(filePath: string) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8");
  }

  return null;
}

function detectLanguage(filePath: string) {
  const extension = path.extname(filePath).slice(1);
  if (extension) {
    return extension;
  }

  return "";
}

function resolveCodeFile(file: string) {
  const directPath = path.join(ROOT_DIR, file);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  if (file.startsWith("layouts/_default/")) {
    const examplePath = path.join(EXAMPLES_DIR, path.basename(file));
    if (fs.existsSync(examplePath)) {
      return examplePath;
    }
  }

  return null;
}

function preprocessShortcodes(markdown: string) {
  let output = markdown;

  output = output.replace(
    /\{\{<\s*figure\s+src="([^"]+)"(?:\s+title="([^"]*)")?\s*>\}\}/g,
    (_match, src, title = "") => {
      const caption = title ? `\n<figcaption>${escapeHtml(title)}</figcaption>` : "";
      return `<figure><img src="${src}" alt="${escapeHtml(title || "")}" loading="lazy" />${caption}</figure>`;
    },
  );

  output = output.replace(/\{\{<\s*youtube\s+([A-Za-z0-9_-]+)\s*>\}\}/g, (_match, videoId) => {
    return `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>`;
  });

  output = output.replace(/\{\{%+\s*warning\s*%+\}\}([\s\S]*?)\{\{%+\s*\/warning\s*%+\}\}/g, (_match, content) => {
    return `<aside class="callout warning">\n${content.trim()}\n</aside>`;
  });

  output = output.replace(/\{\{<\s*code\s+file="([^"]+)"(?:\s+download="[^"]*")?\s*>\}\}[\s\S]*?\{\{<\s*\/code\s*>\}\}/g, (_match, file) => {
    const resolved = resolveCodeFile(file);
    if (!resolved) {
      return `\`\`\`\nUnable to load source file: ${file}\n\`\`\``;
    }

    const code = fs.readFileSync(resolved, "utf8");
    const lang = detectLanguage(file);
    return `\`\`\`${lang}\n${code.trimEnd()}\n\`\`\``;
  });

  return output;
}

function normalizeRoute(filePath: string) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const segments = relativePath.split(path.sep);
  const fileName = segments.pop() ?? "";
  const bareName = fileName.replace(/\.md$/, "");

  if (bareName !== "_index" && bareName !== "index") {
    segments.push(bareName);
  }

  return segments;
}

function readMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return readMarkdownFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      return [fullPath];
    }

    return [];
  });
}

function cleanText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadMenusForLanguage(language: string): MenuGroups {
  const menuPath = path.join(MENU_DIR, `menus.${language}.toml`);
  const raw = readIfExists(menuPath);

  if (!raw) {
    return { docs: [], global: [] };
  }

  const parsed = parseToml(raw) as { docs?: MenuItem[]; global?: MenuItem[] };

  return {
    docs: [...(parsed.docs ?? [])].sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0)),
    global: [...(parsed.global ?? [])].sort((a, b) => (a.weight ?? 0) - (b.weight ?? 0)),
  };
}

const allPages = readMarkdownFiles(CONTENT_DIR)
  .map((filePath) => {
    const source = fs.readFileSync(filePath, "utf8");
    const parsed = matter(source.replace(/^\uFEFF?/, "").trimStart());
    const routeSegments = normalizeRoute(filePath);
    const routePath = `/${routeSegments.join("/")}/`;
    const processedBody = preprocessShortcodes(parsed.content);
    const html = marked.parse(processedBody) as string;
    const description = String(
      parsed.data.description ??
        cleanText(processedBody).slice(0, 160),
    );

    return {
      filePath,
      routeSegments,
      routePath,
      lang: routeSegments[0] ?? "zh",
      slug: routeSegments.slice(1).join("/"),
      title: String(parsed.data.title ?? routeSegments.at(-1) ?? "airdb"),
      description,
      html,
      body: processedBody,
      isIndex: path.basename(filePath) === "_index.md" || path.basename(filePath) === "index.md",
      section: routeSegments[1] ?? null,
      data: parsed.data as Record<string, any>,
    } satisfies SitePage;
  })
  .sort((a, b) => a.routePath.localeCompare(b.routePath, "zh-Hans"));

const menuCache = new Map<string, MenuGroups>();

export function getAllPages() {
  return allPages;
}

export function getPageBySegments(segments: string[]) {
  const routePath = `/${segments.join("/")}/`;
  return allPages.find((page) => page.routePath === routePath) ?? null;
}

export function getChildren(page: SitePage) {
  return allPages.filter((candidate) => {
    if (candidate.routeSegments.length !== page.routeSegments.length + 1) {
      return false;
    }

    return page.routeSegments.every((segment, index) => candidate.routeSegments[index] === segment);
  });
}

export function getSiblingPages(page: SitePage) {
  if (page.routeSegments.length <= 1) {
    return [];
  }

  const parentSegments = page.routeSegments.slice(0, -1);
  return allPages.filter((candidate) => {
    if (candidate.routeSegments.length !== page.routeSegments.length) {
      return false;
    }

    return parentSegments.every((segment, index) => candidate.routeSegments[index] === segment);
  });
}

export function getLanguageMenus(language: string) {
  if (!menuCache.has(language)) {
    menuCache.set(language, loadMenusForLanguage(language));
  }

  return menuCache.get(language)!;
}

export function getAvailableLanguages() {
  return Array.from(new Set(allPages.map((page) => page.lang))).sort();
}

const languageRouteMap: Record<string, Record<string, string>> = {
  zh: {
    "": "/cc/",
    about: "/cc/about/",
    "about/intro": "/cc/about/",
    "about/teamwork": "/cc/about/",
    "about/security": "/cc/about/",
    "about/pm": "/cc/about/",
    "about/interest": "/cc/about/",
    "about/todo": "/cc/about/",
    "about/contribute": "/cc/contact/",
    news: "/cc/post/",
    documentation: "/cc/about/",
    dev: "/cc/contact/",
  },
  cc: {
    "": "/zh/",
    about: "/zh/about/intro/",
    contact: "/zh/about/contribute/",
    post: "/zh/news/",
    "post/chapter-1": "/zh/about/contribute/",
    "post/chapter-2": "/zh/news/",
    "post/chapter-3": "/zh/news/",
  },
};

export function getLanguageOptions(page: SitePage, labels: Record<string, string>) {
  const available = getAvailableLanguages().sort((left, right) => {
    if (left === page.lang) {
      return -1;
    }

    if (right === page.lang) {
      return 1;
    }

    return left.localeCompare(right);
  });

  return available.map((code) => {
    if (code === page.lang) {
      return { code, label: labels[code] ?? code.toUpperCase(), url: page.routePath, active: true };
    }

    const restSlug = page.routeSegments.slice(1).join("/");
    const directMatch = getPageBySegments([code, ...page.routeSegments.slice(1)]);
    const mappedPath = languageRouteMap[page.lang]?.[restSlug] ?? languageRouteMap[page.lang]?.[""];

    return {
      code,
      label: labels[code] ?? code.toUpperCase(),
      url: directMatch?.routePath ?? mappedPath ?? `/${code}/`,
      active: false,
    };
  });
}
