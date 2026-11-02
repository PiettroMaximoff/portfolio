import { gallery } from "@/data/gallery";
import type { Project, ProjectImage, ProjectNeighbors } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bizan-atlas",
    title: "Bizan Atlas",
    year: "2025–2026",
    company: "Бизан",
    role: "Единственный frontend",
    summary:
      "Аналитическая платформа управления проектами и отчётности: дашборды, реестры, карточки сущностей и динамические формы.",
    body: [
      "Единственный frontend-разработчик: архитектура SPA, технические решения, дашборды и формы.",
      "Система аналитических дашбордов на Chart.js, реестры с кроссфильтрацией, карточки проектов, продаж, заказчиков, сотрудников и подрядчиков, справочники и администрирование групп.",
      "Конструктор сложных динамических форм: зависимые поля, валидация, автосохранение, условное отображение данных. Состояние на Redux Toolkit, маршрутизация на React Router.",
      "Оптимизация производительности: code splitting, ленивая загрузка роутов, мемоизация, debounce.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Router",
      "Chart.js",
      "Tailwind",
      "Docker",
    ],
    links: [],
    imagesNote: "Все личные данные на скриншотах вымышлены и приведены в демонстрационных целях.",
    featured: true,
    accent: "linear-gradient(160deg, #e7e2d8 0%, #d9d3c7 100%)",
  },
  {
    slug: "bizan-pro",
    title: "bizan.pro",
    year: "2025–2026",
    company: "Бизан",
    role: "Next.js + Strapi",
    summary:
      "Новая версия сайта консалтинговой компании: Next.js и TypeScript, контент из Strapi CMS.",
    body: [
      "Новая версия сайта компании Бизан на Next.js и TypeScript с серверным рендерингом.",
      "Контент — услуги, проекты, публикации в СМИ, FAQ — редактируется в Strapi CMS и приходит на сайт через API.",
    ],
    tags: ["Next.js", "TypeScript", "Strapi CMS", "SSR / SSG"],
    links: [{ label: "Открыть сайт", href: "https://bizan.pro/" }],
    featured: true,
    accent: "linear-gradient(160deg, #e3e8e4 0%, #d2dbd4 100%)",
  },
  {
    slug: "clinic-sites",
    title: "Сайты медицинской клиники",
    year: "2026 — сейчас",
    company: "Клиника доктора Ласкова",
    role: "Fullstack-разработчик",
    summary:
      "Сайты на 1С-Битрикс: онлайн-запись к врачам с интеграцией 1С, страницы и лендинги под маркетинг.",
    body: [
      "Модуль онлайн-записи к врачам с интеграцией 1С.",
      "Страницы и интерфейсы под маркетинг и продажи: сбор отзывов о врачах, лендинги с формами Bitrix24, доработка виджета чатов и каналов связи.",
      "Задачи с маркетологами: разбор до бизнес-цели, варианты реализации с оценкой, выбор решения вместе.",
      "Поддержка и развитие сайтов: новый функционал, legacy-код, исправление ошибок.",
    ],
    tags: ["JavaScript", "HTML", "CSS", "1С-Битрикс", "1С", "Bitrix24"],
    links: [],
    featured: false,
    accent: "linear-gradient(160deg, #ebe4dc 0%, #ddd4c8 100%)",
  },
  {
    slug: "content-automation",
    title: "Автоматизация контента и статистики",
    year: "2026 — сейчас",
    company: "Клиника доктора Ласкова",
    role: "Автоматизация + AI",
    summary:
      "Публикация материалов на сайт, генерация вариантов и обложек для соцсетей, ежемесячная статистика.",
    body: [
      "Выгрузка материалов на сайт: публикация без ручного копирования, синхронизация статусов и SEO-полей.",
      "Генерация вариантов текстов и обложек для соцсетей из одного материала с помощью LLM.",
      "Ежемесячный сбор статистики сообществ из социальных сетей — раньше это делали руками.",
    ],
    tags: ["Python", "1С-Битрикс", "LLM"],
    links: [],
    featured: false,
    accent: "linear-gradient(160deg, #e6e8e1 0%, #d5d9cf 100%)",
  },
  {
    slug: "intranet-crocus",
    title: "Intranet Crocus Group",
    year: "2023–2025",
    company: "Crocus Group",
    role: "React + UI/UX",
    summary:
      "Внутренний портал и корпоративное облачное хранилище: клиентская логика и дизайн интерфейсов.",
    body: [
      "Многофункциональный внутренний портал компании на React: новости, заявки, документы, справочник сотрудников, профиль.",
      "Корпоративное облачное хранилище «Диск» — отдельное React-приложение в том же контуре.",
      "Проектировал интерфейсы и участвовал в создании дизайна системы, включая мобильную версию.",
    ],
    tags: ["React", "JavaScript", "UI design", "Адаптив"],
    links: [],
    featured: true,
    accent: "linear-gradient(160deg, #e6e4e0 0%, #d7d4ce 100%)",
  },
  {
    slug: "crocus-city-mall",
    title: "Интерактивная карта Crocus City Mall",
    year: "2023–2025",
    company: "Crocus Group",
    role: "React",
    summary:
      "Карта торгового центра: поиск бутика, навигация и подсветка; интерфейсы для touch-панелей внутри ТЦ.",
    body: [
      "Интерактивная карта торгового центра на React: поиск бутика по названию и навигация.",
      "Подсветка нужного бутика при переходе из его карточки на сайте.",
      "Отдельные интерфейсы под touch-панели внутри молла.",
    ],
    tags: ["React", "JavaScript", "Interactive UI"],
    links: [
      { label: "Открыть карту", href: "https://crocuscitymall.ru/plan_mall/" },
    ],
    featured: false,
    accent: "linear-gradient(160deg, #e4e7ea 0%, #d3d8de 100%)",
  },
  {
    slug: "crocus-group",
    title: "Crocus Group",
    year: "2023–2025",
    company: "Crocus Group",
    role: "HTML / JS / Bitrix",
    summary:
      "Корпоративный сайт девелопера с нуля: вёрстка и клиентская логика на Bitrix.",
    body: [
      "Сайт crocusgroup.ru с нуля: HTML, JavaScript и клиентская часть на Bitrix CMS.",
      "Адаптивная и кроссбраузерная вёрстка, разделы проектов и новостей, дальнейшая поддержка.",
    ],
    tags: ["JavaScript", "HTML", "Bitrix", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://crocusgroup.ru/" }],
    featured: true,
    accent: "linear-gradient(160deg, #ebe6dc 0%, #ddd6c8 100%)",
  },
  {
    slug: "vegas-city",
    title: "Vegas City",
    year: "2023–2025",
    company: "Crocus Group",
    role: "HTML / JS / Bitrix",
    summary: "Сайт сети ТРК Crocus Vegas: магазины, карта, меню и новые блоки.",
    body: [
      "Разработка и поддержка vegas-city.ru: каталог магазинов, карта, навигация и новые блоки главной.",
      "Адаптивная вёрстка и клиентская логика на HTML, JavaScript и Bitrix.",
    ],
    tags: ["JavaScript", "HTML", "Bitrix", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://vegas-city.ru/" }],
    featured: true,
    accent: "linear-gradient(160deg, #e8e4ea 0%, #d8d3dc 100%)",
  },
  {
    slug: "vegas-actions",
    title: "Акции Vegas City",
    year: "2023–2025",
    company: "Crocus Group",
    role: "React + TypeScript",
    summary: "Отдельная страница акций Vegas City на React и TypeScript.",
    body: [
      "Страница акций action.vegas-city.ru как отдельное приложение на React и TypeScript.",
      "Десктопная и мобильная версии.",
    ],
    tags: ["React", "TypeScript", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://action.vegas-city.ru/" }],
    featured: false,
    accent: "linear-gradient(160deg, #ece4e6 0%, #dcd2d5 100%)",
  },
  {
    slug: "greek-legend",
    title: "Greek Legend",
    year: "2023–2025",
    company: "Частные проекты",
    role: "Vue / Nuxt",
    summary:
      "Новые страницы, доработки и улучшения по всему сайту на Vue и Nuxt.",
    body: [
      "Новые страницы коллекций и пользовательская логика на Vue и Nuxt.",
      "Доработки и улучшения по всему сайту, десктопная и мобильная версии.",
    ],
    tags: ["Vue", "Nuxt", "JavaScript"],
    links: [{ label: "Открыть сайт", href: "https://greeklegend.ru/" }],
    featured: true,
    accent: "linear-gradient(160deg, #e4e6e2 0%, #d4d8d3 100%)",
  },
  {
    slug: "agalarov",
    title: "Agalarov Finance и Agalarov Insurance",
    year: "2023–2025",
    company: "Crocus Group",
    role: "Vue / Nuxt",
    summary:
      "Развитие двух проектов на Vue/Nuxt: новые интерфейсы и пользовательская логика.",
    body: [
      "Новые интерфейсы и пользовательская логика на Vue и Nuxt.",
      "Поддержка существующего функционала, рефакторинг и исправление ошибок.",
    ],
    tags: ["Vue", "Nuxt", "JavaScript"],
    links: [
      { label: "Agalarov Finance", href: "https://agalarov-finance.ru/" },
      { label: "Agalarov Insurance", href: "https://agalarovdevelopment.com/" },
    ],
    featured: false,
    accent: "linear-gradient(160deg, #e2e5e8 0%, #d1d6db 100%)",
  },
  {
    slug: "razbor",
    title: "разбор.рф",
    year: "2021–2023",
    company: "Флекскор",
    role: "Редизайн + JS",
    summary:
      "Интернет-магазин: полный редизайн, рефакторинг кода, новый функционал и оптимизация производительности.",
    body: [
      "Полный редизайн интернет-магазина: главная, каталог, карточка товара, мобильная версия.",
      "Рефакторинг legacy-кода, новый функционал на JavaScript и оптимизация производительности.",
    ],
    tags: ["JavaScript", "HTML", "SCSS", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://разбор.рф/" }],
    featured: false,
    accent: "linear-gradient(160deg, #e9e5dd 0%, #dad4c9 100%)",
  },
  {
    slug: "svetplaza",
    title: "Svetplaza",
    year: "2021–2023",
    company: "Флекскор",
    role: "Редизайн + JS",
    summary:
      "Интернет-магазин светильников: редизайн, рефакторинг, новый функционал и оптимизация.",
    body: [
      "Полный редизайн интернет-магазина: каталог, многоуровневое меню, мобильная версия.",
      "Рефакторинг кода, новый функционал на JavaScript и оптимизация производительности.",
    ],
    tags: ["JavaScript", "HTML", "SCSS", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://svetplaza.ru/" }],
    featured: false,
    accent: "linear-gradient(160deg, #ebe7df 0%, #ddd8cd 100%)",
  },
  {
    slug: "fishing-season",
    title: "Fishing Season",
    year: "2021–2023",
    company: "Флекскор",
    role: "Редизайн",
    summary:
      "Интернет-магазин рыболовных снастей: полный редизайн и рефакторинг.",
    body: [
      "Полный редизайн интернет-магазина: главная, каталог, мобильная версия.",
      "Рефакторинг клиентского кода.",
    ],
    tags: ["JavaScript", "HTML", "SCSS", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://new.fishing-season.ru/" }],
    featured: false,
    accent: "linear-gradient(160deg, #e3e6e8 0%, #d2d7db 100%)",
  },
  {
    slug: "vyzov",
    title: "Премия и фонд «Вызов»",
    year: "2021–2023",
    company: "Флекскор",
    role: "С нуля",
    summary:
      "Лендинг ежегодной национальной премии в области будущих технологий и сайт фонда — оба с нуля.",
    body: [
      "Лендинг премии «Вызов» с нуля: вёрстка, клиентская логика, адаптив.",
      "Сайт фонда «Вызов» с нуля.",
    ],
    tags: ["JavaScript", "HTML", "SCSS", "Адаптив"],
    links: [
      { label: "Премия", href: "https://премиявызов.рф/" },
      { label: "Фонд", href: "https://fondvyzov.ru/" },
    ],
    featured: false,
    accent: "linear-gradient(160deg, #e5e1dc 0%, #d4cec6 100%)",
  },
  {
    slug: "gruzovichkof",
    title: "Калькулятор Грузовичкоф",
    year: "2021–2023",
    company: "Флекскор",
    role: "JavaScript",
    summary:
      "Калькулятор стоимости сборных грузов с нуля и сайт Грузовичкоф Express.",
    body: [
      "Калькулятор стоимости заказа для сборных грузов с нуля: отправка и доставка от адреса или терминала, даты и интервалы, параметры груза, доп. услуги и упаковка.",
      "Сайт Грузовичкоф Express с нуля (позже перенесён на другой домен).",
    ],
    tags: ["JavaScript", "Forms", "API"],
    links: [
      {
        label: "Открыть калькулятор",
        href: "https://cargo-gruzovichkof.ru/calculate-order",
      },
    ],
    featured: false,
    accent: "linear-gradient(160deg, #e3e9e2 0%, #d1dbcf 100%)",
  },
  {
    slug: "cargo-trans",
    title: "Карго Транс",
    year: "2021–2023",
    company: "Флекскор",
    role: "С нуля",
    summary:
      "Сайт логистической компании с нуля: карта направлений, расписание отправок.",
    body: [
      "Сайт с нуля: интерактивная карта направлений, расписание отправок с обратным отсчётом, поиск и отслеживание заявки.",
      "Адаптивная вёрстка и мобильная версия.",
    ],
    tags: ["JavaScript", "HTML", "SCSS", "Адаптив"],
    links: [{ label: "Открыть сайт", href: "https://cargo-trans.pro/" }],
    featured: false,
    accent: "linear-gradient(160deg, #ece5dd 0%, #ded5ca 100%)",
  },
  {
    slug: "re-tec",
    title: "Ритек",
    year: "2021–2023",
    company: "Флекскор",
    role: "С нуля",
    summary: "Сайт производителя торгового холодильного оборудования с нуля.",
    body: ["Сайт с нуля: вёрстка, клиентская логика, адаптив."],
    tags: ["JavaScript", "HTML", "SCSS"],
    links: [{ label: "Открыть сайт", href: "https://re-tec.ru/" }],
    featured: false,
    accent: "linear-gradient(160deg, #e2e6ea 0%, #d0d6dd 100%)",
  },
  {
    slug: "zdeslegko",
    title: "Здесь легко",
    year: "2023–2025",
    company: "Частные проекты",
    role: "Редизайн + формы",
    summary: "Редизайн сайта, многоэтапные формы, оптимизация и рефакторинг.",
    body: [
      "Редизайн сайта и многоэтапные формы.",
      "Оптимизация и рефакторинг клиентского кода.",
    ],
    tags: ["JavaScript", "Forms", "HTML", "SCSS"],
    links: [{ label: "Открыть сайт", href: "https://zdeslegko.ru/" }],
    featured: false,
    accent: "linear-gradient(160deg, #e7e8e0 0%, #d7d9cd 100%)",
  },
  {
    slug: "torgberu",
    title: "Торгберу",
    year: "2021–2023",
    company: "Флекскор",
    role: "Интернет-магазин",
    summary: "Интернет-магазин с нуля на внутренней CMS.",
    body: [
      "Интернет-магазин с нуля на внутренней CMS компании: вёрстка, клиентская логика, адаптив.",
    ],
    tags: ["JavaScript", "HTML", "SCSS", "API"],
    links: [],
    note: "Сайт больше не доступен",
    featured: false,
    accent: "linear-gradient(160deg, #e8e3e0 0%, #d9d2ce 100%)",
  },
];

export function getGallery(slug: string): ProjectImage[] {
  return gallery[slug] ?? [];
}

export function getCover(slug: string): ProjectImage | undefined {
  return getGallery(slug)[0];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbors(slug: string): ProjectNeighbors {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
