export type ExperienceItem = {
  /** Якорь группы проектов на странице /projects: ссылка вида /projects#crocus. */
  id: string;
  /** Совпадает с `Project.company`, чтобы связать место работы с проектами. */
  company: string;
  role: string;
  period: string;
  /** Короткий период для заголовков: «2023–2025». */
  years: string;
  summary: string;
  points: string[];
  link?: { label: string; href: string };
};
