"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { ProjectPlaceholder } from "@/components/projects/ProjectPlaceholder";
import { getGallery } from "@/data/projects";
import { screenshotsLabel } from "@/lib/plural";
import type { Project } from "@/types/project";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 18,
  });
  const spotlight = useTransform([mx, my], ([x, y]) => {
    const px = ((Number(x) + 0.5) * 100).toFixed(1);
    const py = ((Number(y) + 0.5) * 100).toFixed(1);
    return `radial-gradient(420px circle at ${px}% ${py}%, rgba(26,25,22,0.08), transparent 42%)`;
  });

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const images = getGallery(project.slug);
  const cover = images[0];

  return (
    <motion.div
      className={styles.wrap}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        className={styles.card}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <motion.span className={styles.spotlight} style={{ background: spotlight }} />
        <span className={styles.visual} style={{ background: project.accent }}>
          {cover ? (
            <Image
              className={styles.cover}
              src={cover.src}
              alt=""
              fill
              sizes="(max-width: 860px) 100vw, 560px"
            />
          ) : (
            <ProjectPlaceholder className={styles.placeholder} slug={project.slug} />
          )}
          {images.length > 1 && (
            <span className={styles.count}>{screenshotsLabel(images.length)}</span>
          )}
        </span>
        <span className={styles.body}>
          <span className={styles.meta}>
            <span>
              {project.company} · {project.year}
            </span>
            <span className={styles.role}>{project.role}</span>
          </span>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.summary}>{project.summary}</span>
          <span className={styles.tags}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
          <span className={styles.cta}>Открыть проект →</span>
        </span>
      </Link>
    </motion.div>
  );
}
