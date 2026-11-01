import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { baseOpenGraph, ogImage } from "@/lib/site";
import styles from "./projects.module.css";

const title = "Проекты — Владислав Ухлин";
const description =
  "Frontend-проекты по местам работы: аналитическая платформа, корпоративные порталы, интерактивные карты, сайты и интернет-магазины.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { ...baseOpenGraph, title, description, url: "/projects", images: [ogImage] },
};

const groups = experience
  .map((job) => ({ job, items: projects.filter((project) => project.company === job.company) }))
  .filter((group) => group.items.length > 0);

export default function ProjectsPage() {
  return (
    <main className={`section grid-overlay ${styles.page}`}>
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Каталог</p>
            <h1>Все проекты</h1>
          </div>
        </Reveal>

        {groups.map(({ job, items }, groupIndex) => (
          <section key={job.company} id={job.id} className={styles.group} aria-labelledby={`group-${groupIndex}`}>
            <Reveal>
              <header className={styles.groupHead}>
                <h2 id={`group-${groupIndex}`}>{job.company}</h2>
                <p>
                  {job.period} · {job.role}
                </p>
              </header>
            </Reveal>
            <div className={styles.grid}>
              {items.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
