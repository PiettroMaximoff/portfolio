"use client";

import { useEffect, useRef } from "react";
import styles from "./StackSection.module.css";

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>/=+*";

type Drop = {
  x: number;
  y: number;
  speed: number;
  painted: number;
};

export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !parent || !context) return;

    const ctx = context;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontSize = 15;
    const columnGap = 84;
    const minSpeed = 0.65;
    const speedSpread = 0.7;
    // How much of each previous glyph is erased per frame. Higher means a shorter trail.
    const trailFade = 0.023;
    const nextSpeed = () => minSpeed + Math.random() * speedSpread;

    let width = 0;
    let height = 0;
    let drops: Drop[] = [];
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(4, Math.round(width / columnGap));
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * Math.max(width - fontSize, 1),
        y: Math.random() * height,
        speed: nextSpeed(),
        painted: -fontSize,
      }));

      if (reduce) draw(false);
    };

    const fadeSpan = 170;

    const edgeFade = (y: number) => {
      const enter = Math.min(1, Math.max(0, y / fadeSpan));
      const leave = Math.min(1, Math.max(0, (height - y - fontSize) / fadeSpan));
      const smooth = (t: number) => t * t * (3 - 2 * t);
      return smooth(enter) * smooth(leave);
    };

    const paintGlyph = (x: number, y: number, alpha: number) => {
      const faded = alpha * edgeFade(y);
      if (faded < 0.02) return;
      const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      ctx.fillStyle = `rgba(63, 60, 54, ${faded})`;
      ctx.fillText(glyph, x, y);
    };

    const draw = (moving: boolean) => {
      if (moving) {
        // Erase previous frames a little each tick so glyphs leave a short trail
        // without painting an opaque plate over the page background.
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = `rgba(0, 0, 0, ${trailFade})`;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      ctx.font = `500 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i += 1) {
        const drop = drops[i];

        if (!moving) {
          paintGlyph(drop.x, drop.y, 0.2);
          continue;
        }

        drop.y += drop.speed;
        // A new symbol only after the previous one has moved about one line,
        // so a slow fall stays a trail of letters instead of a solid streak.
        if (drop.y - drop.painted >= fontSize * 0.92) {
          paintGlyph(drop.x, drop.y, 0.5);
          drop.painted = drop.y;
        }

        if (drop.y > height + fontSize) {
          drop.y = -fontSize * (2 + Math.random() * 10);
          drop.painted = drop.y;
          drop.speed = nextSpeed();
        }
      }
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      draw(true);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(parent);

    resize();
    draw(!reduce);

    if (!reduce) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.rain} aria-hidden="true" />;
}
