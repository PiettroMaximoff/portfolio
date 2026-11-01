import type { ReactNode } from "react";

/**
 * Все иконки сайта: контурные, сетка 24×24, цвет берут из currentColor.
 * Чтобы добавить иконку, достаточно новой записи здесь.
 */
const icons = {
  code: (
    <>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
    </>
  ),
  layers: (
    <>
      <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 15.5 8 4.5 8-4.5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5Z" />,
  rocket: (
    <>
      <path d="M12 3c3.5 2 5.5 5.5 5.5 9.5 0 2.2-.7 4-1.8 5.2L12 21l-3.7-3.3C7.2 16.5 6.5 14.7 6.5 12.5 6.5 8.5 8.5 5 12 3Z" />
      <path d="M12 11.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9.5" r="2.4" />
      <path d="M3.5 18.5c.8-2.6 2.9-4 5.5-4s4.7 1.4 5.5 4" />
      <path d="M13.2 14.8c1.5-.5 3.1-.3 4.8.9" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="m5.6 5.6 2.1 2.1" />
      <path d="m16.3 16.3 2.1 2.1" />
      <path d="m16.3 5.6-2.1 2.1" />
      <path d="m5.6 16.3 2.1-2.1" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  telegram: (
    <>
      <path d="m20.5 5.5-16 6.2 5.2 1.7 1.8 5.6 2.8-3.4 4.4 3.2 1.8-13.3Z" />
      <path d="m9.7 13.4 7.2-5.2" />
    </>
  ),
  download: (
    <>
      <path d="M12 4.5v10" />
      <path d="m8 11 4 4 4-4" />
      <path d="M5 19.5h14" />
    </>
  ),
  home: (
    <>
      <path d="M4.5 10.5 12 4l7.5 6.5" />
      <path d="M7 9.8V19h10V9.8" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="m6.5 10.5 5.5-5.5 5.5 5.5" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  expand: (
    <>
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.8" r="0.6" fill="currentColor" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

/** Список имён для тестов и витрины иконок. */
export const iconNames = Object.keys(icons) as IconName[];

type IconProps = {
  name: IconName;
  className?: string;
  /** Толщина линии; по умолчанию 1.6, у мелких кнопок чуть толще. */
  strokeWidth?: number;
  /** Подпись для скринридера. Без неё иконка декоративная и скрыта от него. */
  label?: string;
};

export function Icon({ name, className, strokeWidth = 1.6, label }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
