"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { getCover, getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/types/project";
import { ProjectPlaceholder } from "@/components/projects/ProjectPlaceholder";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ProjectBento.module.css";

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function formatStack(tags: string[]) {
  return tags.slice(0, 3).join(" / ").toUpperCase();
}

export function ProjectBento() {
  const featured = getFeaturedProjects();
  const [active, setActive] = useState<Project | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  // Превью показываем, только когда известна реальная позиция курсора:
  // при скролле без движения мыши браузер шлёт enter-события, а координат у нас ещё нет.
  const [anchored, setAnchored] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 28, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section id="work" className={`section ${styles.section}`}>
      <div className={`wrap ${styles.wrap}`}>
        <Reveal>
          <div className={styles.head}>
            <div className="section-head">
              <p className="kicker">Проекты</p>
              <h2>Избранные проекты</h2>
              <p>Проекты, которые лучше всего показывают стек и масштаб задач</p>
            </div>
            <Link className={`${styles.more} fill-reveal`} href="/projects">
              Все проекты
            </Link>
          </div>
        </Reveal>

        <div
          className={styles.list}
          onPointerMove={(event) => {
            if (!finePointer) return;
            if (!anchored) {
              x.jump(event.clientX);
              y.jump(event.clientY);
              setAnchored(true);
            }
            rawX.set(event.clientX);
            rawY.set(event.clientY);
          }}
          onPointerLeave={() => {
            setActive(null);
            setAnchored(false);
          }}
        >
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className={styles.row}
                data-active={active?.slug === project.slug}
                onPointerEnter={() => setActive(project)}
                onFocus={() => setActive(project)}
                onBlur={() => setActive((current) => (current?.slug === project.slug ? null : current))}
              >
                <span className={styles.index}>{formatIndex(index)}</span>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.stack}>{formatStack(project.tags)}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <Icon name="arrowUpRight" strokeWidth={1.7} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {finePointer && (
        <motion.div
          className={styles.preview}
          style={{ x, y }}
          aria-hidden="true"
          data-visible={Boolean(active) && anchored}
        >
          <div className={styles.previewCard} style={{ background: active?.accent }}>
            {featured.map((project) => {
              const cover = getCover(project.slug);
              if (!cover) return null;
              return (
                <Image
                  key={project.slug}
                  className={styles.previewImage}
                  data-active={active?.slug === project.slug}
                  src={cover.src}
                  alt=""
                  fill
                  sizes="288px"
                />
              );
            })}
            {active && !getCover(active.slug) && (
              <ProjectPlaceholder className={styles.previewPlaceholder} slug={active.slug} />
            )}
          </div>
          <span className={styles.previewBadge}>Кейс</span>
        </motion.div>
      )}
    </section>
  );
}
