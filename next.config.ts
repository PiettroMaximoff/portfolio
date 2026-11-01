import type { NextConfig } from "next";

// Сборка для GitHub Pages: статический экспорт в папку out/, без сервера.
// Включается переменной DEPLOY_TARGET=github-pages (см. .github/workflows/deploy.yml);
// обычные npm run dev / build остаются прежними.
const isPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      // /projects/ → projects/index.html: работает на любом статическом хостинге.
      trailingSlash: true,
      basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
      images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        qualities: [75, 85],
      },
    };

export default nextConfig;
