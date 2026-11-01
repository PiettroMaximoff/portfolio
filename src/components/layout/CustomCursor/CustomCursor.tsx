"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      const on = fine.matches && !reduce.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("has-custom-cursor", on);
      if (!on) {
        setVisible(false);
        setPressed(false);
      }
    };

    syncEnabled();
    fine.addEventListener("change", syncEnabled);
    reduce.addEventListener("change", syncEnabled);

    return () => {
      fine.removeEventListener("change", syncEnabled);
      reduce.removeEventListener("change", syncEnabled);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      setVisible((current) => current || true);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setPressed(false);
    };
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={styles.cursor}
      data-visible={visible}
      data-pressed={pressed}
      aria-hidden="true"
    />
  );
}
