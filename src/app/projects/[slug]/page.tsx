import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectPlaceholder } from "@/components/projects/ProjectPlaceholder";
import { Icon } from "@/components/ui/Icon";
import {
  getCover,
  getGallery,
  getNeighbors,
  getProject,
  projects,
} from "@/data/projects";
import { baseOpenGraph, ogImage } from "@/lib/site";
import type { Project } from "@/types/project";
import styles from "./case.module.css";

type ProjectPageParams = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Проект не найден" };
  const cover = getCover(slug);
  const title = `${project.title} — Владислав Ухлин`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      ...baseOpenGraph,
      title,
      description: project.summary,
      url: `/projects/${slug}`,
      // SVG-схемы соцсети не показывают, для таких проектов берём общую картинку.
      images: [
        cover && !cover.src.endsWith(".svg")
          ? {
              url: cover.src,
              width: cover.width,
              height: cover.height,
              alt: cover.alt,
            }
          : ogImage,
      ],
    },
  };
}

function NeighborLink({ project, label }: { project: Project; label: string }) {
  const cover = getCover(project.slug);
  return (
    <Link className={styles.neighbor} href={`/projects/${project.slug}`}>
      <span
        className={styles.neighborThumb}
        style={{ background: project.accent }}
      >
        {cover ? (
          <Image src={cover.src} alt="" fill sizes="96px" />
        ) : (
          <ProjectPlaceholder slug={project.slug} />
        )}
      </span>
      <span className={styles.neighborText}>
        <span className={styles.neighborLabel}>{label}</span>
        {project.title}
      </span>
    </Link>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<ProjectPageParams>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = getGallery(project.slug);
  const { prev, next } = getNeighbors(project.slug);

  return (
    <main className={styles.page}>
      <div className="wrap">
        <Link className={styles.back} href="/projects">
          ← Все проекты
        </Link>

        <header className={styles.header}>
          <div className={styles.intro}>
            <p className="kicker">
              {project.company} · {project.year}
            </p>
            <h1>{project.title}</h1>
            <p className={styles.lead}>{project.summary}</p>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Роль</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Компания</dt>
              <dd>{project.company}</dd>
            </div>
            <div>
              <dt>Период</dt>
              <dd>{project.year}</dd>
            </div>
            <div className={styles.factWide}>
              <dt>Стек</dt>
              <dd>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </dd>
            </div>
            {(project.links.length > 0 || project.note) && (
              <div className={styles.factWide}>
                <dt>Ссылки</dt>
                <dd className={styles.links}>
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                  {project.note && (
                    <span className={styles.note}>{project.note}</span>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </header>

        {images.length > 0 ? (
          <>
            {project.imagesNote && (
              <p className={styles.imagesNote} role="note">
                <Icon name="info" />
                <span>{project.imagesNote}</span>
              </p>
            )}
            <ProjectGallery images={images} title={project.title} />
          </>
        ) : (
          <div
            className={styles.placeholder}
            style={{ background: project.accent }}
          >
            <ProjectPlaceholder
              slug={project.slug}
              label={`${project.title}: скриншотов пока нет`}
            />
          </div>
        )}

        <section className={styles.work} aria-labelledby="work-title">
          <h2 id="work-title">Что сделал</h2>
          <ol className={styles.points}>
            {project.body.map((paragraph) => (
              <li key={paragraph}>{paragraph}</li>
            ))}
          </ol>
        </section>

        <nav className={styles.neighbors} aria-label="Соседние проекты">
          {prev && <NeighborLink project={prev} label="Назад" />}
          {next && <NeighborLink project={next} label="Дальше" />}
        </nav>
      </div>
    </main>
  );
}
