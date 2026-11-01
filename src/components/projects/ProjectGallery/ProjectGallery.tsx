"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Icon } from "@/components/ui/Icon";
import type { ProjectImage } from "@/types/project";
import styles from "./ProjectGallery.module.css";

type ProjectGalleryProps = {
  images: ProjectImage[];
  title: string;
};

type ShotKind = "screen" | "page" | "phone" | "phoneLong";

/** Сколько ждём новых событий прокрутки, прежде чем считать, что анимация закончилась. */
const LOCK_TIMEOUT = 250;

/** Выше этой пропорции (высота к ширине) мобильный кадр — не экран, а длинная страница целиком. */
const LONG_PHONE_RATIO = 3;

/** Длинные скриншоты страниц и мобильные экраны показываем по-разному. */
function getKind(image: ProjectImage): ShotKind {
  const ratio = image.height / image.width;
  // Мобильные скриншоты бывают и в @2x (около 860 px), а страницы сняты с десктопа от 1440 px.
  if (image.width < 600 || (ratio > 1.6 && image.width < 1000)) {
    return ratio > LONG_PHONE_RATIO ? "phoneLong" : "phone";
  }
  if (ratio > 1.6) return "page";
  return "screen";
}

/** Длинные кадры в слайдере обрезаются по высоте, целиком их видно в полноэкранном просмотре. */
const isLong = (kind: ShotKind) => kind === "page" || kind === "phoneLong";

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  // Номер слайда, к которому идёт программная прокрутка. Пока она не дошла, индекс из
  // положения скролла не пересчитываем: иначе подпись мигает через промежуточные слайды.
  const scrollingToRef = useRef<{ index: number; timer: number } | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (next: number, behavior: ScrollBehavior = "smooth") => {
      const clamped = (next + count) % count;
      setIndex(clamped);
      const track = trackRef.current;
      if (!track) return;
      const left = clamped * track.clientWidth;
      if (scrollingToRef.current) window.clearTimeout(scrollingToRef.current.timer);
      scrollingToRef.current =
        Math.abs(track.scrollLeft - left) < 1
          ? null
          : {
              index: clamped,
              // Страховка: если прокрутка не началась или оборвалась, блокировку снимаем сами.
              timer: window.setTimeout(() => {
                scrollingToRef.current = null;
              }, LOCK_TIMEOUT),
            };
      track.scrollTo({ left, behavior });
    },
    [count],
  );

  // Индекс по положению скролла: свайп и тачпад тоже двигают слайдер.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      // Пока идут события прокрутки, анимация жива: продлеваем страховочный таймер.
      const pending = scrollingToRef.current;
      if (pending) {
        window.clearTimeout(pending.timer);
        pending.timer = window.setTimeout(() => {
          scrollingToRef.current = null;
        }, LOCK_TIMEOUT);
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const pending = scrollingToRef.current;
        if (pending) {
          // Дошли до целевого слайда: дальше снова слушаем скролл (свайп, тачпад).
          if (Math.abs(track.scrollLeft - pending.index * track.clientWidth) < 2) {
            window.clearTimeout(pending.timer);
            scrollingToRef.current = null;
          }
          return;
        }
        const next = Math.round(track.scrollLeft / track.clientWidth);
        setIndex((current) => (current === next ? current : next));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      if (scrollingToRef.current) window.clearTimeout(scrollingToRef.current.timer);
    };
  }, []);

  useEffect(() => {
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0 });
  }, [index, open]);

  if (count === 0) return null;

  const current = images[index];
  const currentKind = getKind(current);
  // В полноэкранном просмотре длинный мобильный кадр ведёт себя как обычный телефонный.
  const stageKind = currentKind === "phoneLong" ? "phone" : currentKind;

  const onSliderKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const onDialogKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") goTo(index + 1, "instant");
    else if (event.key === "ArrowLeft") goTo(index - 1, "instant");
  };

  const onSwipeStart = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    swipeRef.current = { x: event.clientX, y: event.clientY };
  };

  const onSwipeEnd = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    goTo(index + (dx < 0 ? 1 : -1), "instant");
  };

  return (
    <section className={styles.gallery} aria-roledescription="carousel" aria-label={`Скриншоты: ${title}`}>
      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          onKeyDown={onSliderKey}
          aria-label="Скриншоты, листаются стрелками"
        >
          {images.map((image, i) => {
            const kind = getKind(image);
            return (
              <div
                key={image.src}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} из ${count}: ${image.alt}`}
              >
                <button
                  type="button"
                  className={`${styles.shot} ${styles[kind]}`}
                  // Рамка телефона повторяет пропорцию самого скриншота, иначе его бока обрезаются.
                  style={kind === "phone" ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                  aria-label={`Открыть на весь экран: ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={kind === "phone" || kind === "phoneLong" ? "320px" : "(max-width: 1120px) 100vw, 1120px"}
                    preload={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  {isLong(kind) && <span className={styles.fade} aria-hidden="true" />}
                  <span className={styles.expand} aria-hidden="true">
                    <Icon name="expand" strokeWidth={1.8} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <>
            <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => goTo(index - 1)} aria-label="Предыдущий скриншот">
              <Icon name="chevronLeft" strokeWidth={1.8} />
            </button>
            <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => goTo(index + 1)} aria-label="Следующий скриншот">
              <Icon name="chevronRight" strokeWidth={1.8} />
            </button>
          </>
        )}
      </div>

      <div className={styles.bar}>
        <p className={styles.caption} aria-live="polite">
          <span className={styles.counter}>
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          {current.alt}
        </p>
        {isLong(currentKind) && <span className={styles.hint}>Длинный экран — откройте целиком</span>}
      </div>

      {count > 1 && (
        <div ref={thumbsRef} className={styles.thumbs}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={styles.thumb}
              data-active={i === index}
              aria-current={i === index}
              aria-label={`Скриншот ${i + 1}: ${image.alt}`}
              onClick={() => goTo(i)}
            >
              <Image src={image.src} alt="" fill sizes="120px" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={`${title}: ${current.alt}`}
        onClose={() => setOpen(false)}
        onKeyDown={onDialogKey}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <>
            <div className={styles.lightboxTop}>
              <p className={styles.caption}>
                <span className={styles.counter}>
                  {index + 1} / {count}
                </span>
                {current.alt}
              </p>
              <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Закрыть">
                <Icon name="close" strokeWidth={1.8} />
              </button>
            </div>

            <div
              ref={stageRef}
              className={`${styles.stage} ${styles[`stage-${stageKind}`]}`}
              onPointerDown={onSwipeStart}
              onPointerUp={onSwipeEnd}
              onPointerCancel={() => (swipeRef.current = null)}
              onClick={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <Image
                key={current.src}
                className={styles.full}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes={stageKind === "phone" ? "430px" : "100vw"}
                quality={85}
                // Не растягиваем картинку шире её реального размера, иначе она размывается.
                style={{ maxWidth: current.width }}
              />
            </div>

            {count > 1 && (
              <>
                <button type="button" className={`${styles.nav} ${styles.prev} ${styles.lightboxNav}`} onClick={() => goTo(index - 1, "instant")} aria-label="Предыдущий скриншот">
                  <Icon name="chevronLeft" strokeWidth={1.8} />
                </button>
                <button type="button" className={`${styles.nav} ${styles.next} ${styles.lightboxNav}`} onClick={() => goTo(index + 1, "instant")} aria-label="Следующий скриншот">
                  <Icon name="chevronRight" strokeWidth={1.8} />
                </button>
              </>
            )}
          </>
        )}
      </dialog>
    </section>
  );
}
