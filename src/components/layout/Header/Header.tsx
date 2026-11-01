"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { SmoothLink } from "@/components/ui/SmoothLink";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/nav";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Закрываем меню при смене страницы (в том числе «назад» в браузере).
  // Подстройка состояния во время рендера, а не в эффекте: без лишнего прохода.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const onChange = () => {
      if (!media.matches) setOpen(false);
    };

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    const bindHero = () => {
      if (cancelled) return;

      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (!hero) {
        setStuck(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setStuck(!entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "-72px 0px 0px 0px",
        },
      );

      observer.observe(hero);
    };

    const frame = window.requestAnimationFrame(bindHero);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.stickyHeader = stuck ? "true" : "false";
  }, [stuck]);

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <header
        className={`${styles.header}${stuck ? " glass" : ""}`}
        data-stuck={stuck}
        data-open={open}
      >
        <div className={styles.bar}>
          <Link className={styles.brand} href="/" onClick={() => setOpen(false)} aria-label="На главную">
            <span className={styles.mark} aria-hidden="true">
              <Icon name="home" />
            </span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Основное меню" data-visible={stuck}>
            {navLinks.map((link) => (
              <SmoothLink key={link.href} href={link.href} className={`fill-reveal ${styles.desktopLink}`}>
                {link.label}
              </SmoothLink>
            ))}
          </nav>

          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="site-menu"
            hidden={open}
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Открыть меню</span>
            <span className={styles.burgerLines} />
          </button>
        </div>

        <div id="site-menu" className={styles.panel} data-open={open}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Закрыть меню">
            <span className={styles.burgerLines} data-open="true" />
          </button>
          <nav aria-label="Мобильное меню">
            {navLinks.map((link) => (
              <SmoothLink
                key={link.href}
                href={link.href}
                className={`fill-reveal ${styles.menuLink}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </SmoothLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
