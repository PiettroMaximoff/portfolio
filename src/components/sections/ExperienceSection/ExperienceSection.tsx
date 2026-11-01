import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="kicker">Опыт</p>
            <h2>Где работал</h2>
            <p>5 лет коммерческой разработки: от сайтов и интернет-магазинов до SPA и аналитической платформы.</p>
          </div>
        </Reveal>

        <ol className={styles.list}>
          {experience.map((job, index) => {
            const count = projects.filter((project) => project.company === job.company).length;
            return (
              <li key={job.company}>
                <Reveal delay={index * 0.05}>
                  <article className={styles.item}>
                    <p className={styles.period}>{job.period}</p>
                    <div className={styles.head}>
                      <h3>{job.company}</h3>
                      <p className={styles.role}>{job.role}</p>
                    </div>
                    <div className={styles.text}>
                      <p>{job.summary}</p>
                      {job.points.length > 0 && (
                        <ul>
                          {job.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                      {(count > 0 || job.link) && (
                        <p className={styles.links}>
                          {count > 0 && (
                            <Link className="fill-reveal" href={`/projects#${job.id}`}>
                              Проекты: {count}
                            </Link>
                          )}
                          {job.link && (
                            <a className="fill-reveal" href={job.link.href} target="_blank" rel="noopener noreferrer">
                              {job.link.label} ↗
                            </a>
                          )}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
