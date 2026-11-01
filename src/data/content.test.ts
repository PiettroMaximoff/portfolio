import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { experience } from "@/data/experience";
import { gallery } from "@/data/gallery";
import { getFeaturedProjects, getNeighbors, getProject, projects } from "@/data/projects";
import { stackSection } from "@/data/stack";
import { ogImage } from "@/lib/site";

const publicDir = join(process.cwd(), "public");

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (name.startsWith(".")) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

describe("проекты", () => {
  it("у каждого проекта уникальный слаг в kebab-case", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("заполнены обязательные поля", () => {
    for (const project of projects) {
      expect(project.title.trim(), project.slug).not.toBe("");
      expect(project.summary.trim(), project.slug).not.toBe("");
      expect(project.body.length, `${project.slug}: body`).toBeGreaterThan(0);
      expect(project.tags.length, `${project.slug}: tags`).toBeGreaterThan(0);
      expect(project.year, project.slug).toMatch(/\d{4}/);
    }
  });

  it("ссылки проектов — корректные https-адреса с подписью", () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.label.trim(), project.slug).not.toBe("");
        expect(() => new URL(link.href), `${project.slug}: ${link.href}`).not.toThrow();
        expect(new URL(link.href).protocol, `${project.slug}: ${link.href}`).toBe("https:");
      }
    }
  });

  it("каждый проект привязан к существующему месту работы", () => {
    const companies = new Set(experience.map((job) => job.company));
    for (const project of projects) {
      expect(companies.has(project.company), `${project.slug}: «${project.company}»`).toBe(true);
    }
  });

  it("у избранных проектов есть скриншоты для превью", () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBeGreaterThan(0);
    for (const project of featured) {
      expect(gallery[project.slug]?.length, project.slug).toBeGreaterThan(0);
    }
  });

  it("getProject находит проект по слагу и возвращает undefined для неизвестного", () => {
    expect(getProject(projects[0].slug)).toBe(projects[0]);
    expect(getProject("net-takogo")).toBeUndefined();
  });

  it("getNeighbors замыкает список по кругу", () => {
    const first = projects[0];
    const last = projects[projects.length - 1];
    expect(getNeighbors(first.slug).prev).toBe(last);
    expect(getNeighbors(last.slug).next).toBe(first);
    expect(getNeighbors("net-takogo")).toEqual({ prev: undefined, next: undefined });
  });
});

describe("опыт", () => {
  it("идентификаторы и названия мест работы уникальны", () => {
    const ids = experience.map((job) => job.id);
    const names = experience.map((job) => job.company);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]+$/);
  });
});

describe("галерея", () => {
  const entries = Object.entries(gallery);

  it("не содержит галерей для несуществующих проектов", () => {
    const slugs = new Set(projects.map((project) => project.slug));
    for (const [slug] of entries) expect(slugs.has(slug), slug).toBe(true);
  });

  it("каждый файл из галереи лежит в public и имеет описание и размеры", () => {
    for (const [slug, images] of entries) {
      for (const image of images) {
        expect(existsSync(join(publicDir, image.src)), image.src).toBe(true);
        expect(image.src.startsWith(`/projects/${slug}/`), image.src).toBe(true);
        expect(image.alt.trim(), image.src).not.toBe("");
        expect(image.width, image.src).toBeGreaterThan(0);
        expect(image.height, image.src).toBeGreaterThan(0);
      }
    }
  });

  it("в public/projects нет файлов, которые нигде не используются", () => {
    const used = new Set(entries.flatMap(([, images]) => images.map((image) => join(publicDir, image.src))));
    const orphans = filesUnder(join(publicDir, "projects")).filter((file) => !used.has(file));
    expect(orphans).toEqual([]);
  });
});

describe("навыки", () => {
  it("в блоках нет пустых и повторяющихся пунктов", () => {
    for (const block of stackSection.blocks) {
      expect(block.tags.length, block.title).toBeGreaterThan(0);
      expect(new Set(block.tags).size, `${block.title}: дубли`).toBe(block.tags.length);
      for (const tag of block.tags) expect(tag.trim(), block.title).not.toBe("");
    }
  });

  it("ни один пункт не повторяется в разных блоках", () => {
    const all = stackSection.blocks.flatMap((block) => block.tags.map((tag) => tag.toLowerCase()));
    const duplicates = all.filter((tag, index) => all.indexOf(tag) !== index);
    expect(duplicates).toEqual([]);
  });
});

describe("метаданные", () => {
  it("картинка для превью ссылок существует", () => {
    expect(existsSync(join(publicDir, ogImage.url))).toBe(true);
  });
});
