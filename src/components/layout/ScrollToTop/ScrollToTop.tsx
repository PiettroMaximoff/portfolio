"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./ScrollToTop.module.css";

const SHOW_AFTER = 420;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`glass ${styles.button}`}
      data-visible={visible}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Icon name="arrowUp" strokeWidth={1.7} />
    </button>
  );
}
