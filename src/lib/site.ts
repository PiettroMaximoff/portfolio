/**
 * Адрес сайта для абсолютных ссылок в метаданных (OpenGraph, canonical, sitemap).
 * В продакшене задаётся через NEXT_PUBLIC_SITE_URL; на Vercel без неё берётся
 * основной домен проекта, локально — localhost.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Подпапка, в которой лежит сайт (GitHub Pages: /имя-репозитория). Пусто для корня домена.
 * Задаётся на этапе сборки, поэтому годится и для клиентского кода.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Адрес файла из public с учётом подпапки: next/link и next/image делают это сами, обычные <a> нет. */
export const withBasePath = (path: string) => `${basePath}${path}`;

export const siteName = "Владислав Ухлин";

export const siteTitle = "Владислав Ухлин — Frontend-разработчик";

export const siteDescription =
  "Frontend на React и TypeScript: SPA, аналитические платформы, корпоративные порталы, интеграции. 5 лет коммерческой разработки, Москва.";

/** JPEG, а не WebP: так превью ссылки показывают все площадки. */
export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Bizan Atlas — аналитическая платформа",
};

/** Общая часть OpenGraph: дочерние страницы заменяют openGraph целиком, поэтому её подмешивают. */
export const baseOpenGraph = {
  type: "website",
  locale: "ru_RU",
  siteName,
} as const;
