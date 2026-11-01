"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { navLinks } from "@/data/nav";
import { SmoothLink } from "@/components/ui/SmoothLink";
import styles from "./Hero.module.css";

// three.js (~135 КБ gzip) грузится отдельным чанком после гидрации:
// фон декоративный и не должен задерживать интерактивность страницы.
const HeroCanvas = dynamic(() => import("./HeroCanvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
});

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, reduce ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);

  return (
    <section ref={heroRef} className={styles.hero} data-hero>
      <div className={styles.canvasLayer} aria-hidden="true">
        <HeroCanvas />
      </div>
      <motion.div className={styles.content} style={{ y, opacity, scale }}>
        <div className={styles.title}>
          <h1>
            <span className={styles.line}>Frontend</span>
            <span className={`${styles.line} ${styles.lineSecond}`}>Разработчик</span>
          </h1>
          <nav className={styles.nav} aria-label="Разделы страницы">
            {navLinks.map((link) => (
              <SmoothLink key={link.href} href={link.href} className="fill-reveal">
                {link.label}
              </SmoothLink>
            ))}
          </nav>
        </div>
        <div className={styles.corners}>
          <p>
            Москва · <span className="fill-static">5 лет коммерческой разработки</span>
          </p>
          <a
            className="fill-reveal"
            href="https://t.me/hi_lm_poultry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </div>
      </motion.div>
    </section>
  );
}
