import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/projects`, priority: 0.8 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      priority: project.featured ? 0.7 : 0.5,
    })),
  ];
}
