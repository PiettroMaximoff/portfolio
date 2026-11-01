export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  company: string;
  role: string;
  summary: string;
  body: string[];
  tags: string[];
  links: ProjectLink[];
  /** Пометка рядом со ссылками, например «Сайт больше не доступен». */
  note?: string;
  /** Пояснение под галереей, например «Все данные на скриншотах вымышлены». */
  imagesNote?: string;
  featured: boolean;
  accent: string;
};

export type ProjectNeighbors = {
  prev: Project | undefined;
  next: Project | undefined;
};
