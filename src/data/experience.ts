import type { ExperienceItem } from "@/types/experience";

export const experience: ExperienceItem[] = [
  {
    id: "clinic",
    company: "Клиника доктора Ласкова",
    role: "Fullstack-разработчик",
    period: "Август 2026 — сейчас",
    years: "2026 — сейчас",
    summary:
      "Сайты клиники на Битрикс, онлайн-запись с 1С и автоматизация контента.",
    points: [
      "Модуль онлайн-записи к врачам с интеграцией 1С",
      "Лендинги и страницы под маркетинг, формы Bitrix24",
      "AI-автоматизация: публикация контента и сбор статистики соцсетей",
    ],
  },
  {
    id: "freelance",
    company: "Фриланс",
    role: "Frontend-разработчик",
    period: "Май — август 2026",
    years: "2026",
    summary:
      "Проектная работа: интерфейсы и доработки сайтов под задачи заказчиков.",
    points: [],
  },
  {
    id: "bizan",
    company: "Бизан",
    role: "Frontend-разработчик",
    period: "Март 2025 — май 2026",
    years: "2025–2026",
    summary: "Аналитическая платформа Atlas и новая версия сайта компании.",
    points: [
      "Архитектура SPA, дашборды на Chart.js, динамические формы",
      "Redux Toolkit, оптимизация производительности",
      "Сайт bizan.pro на Next.js и Strapi, работа с графикамив Yandex DataLens",
    ],
    link: { label: "bizan.pro", href: "https://bizan.pro/" },
  },
  {
    id: "crocus",
    company: "Crocus Group",
    role: "Frontend-разработчик",
    period: "Октябрь 2023 — март 2025",
    years: "2023–2025",
    summary:
      "Внутренний портал, интерактивная карта ТЦ и сайты группы компаний.",
    points: [
      "Intranet и облачное хранилище на React, участие в дизайне системы",
      "Интерактивная карта Crocus City Mall и интерфейсы touch-панелей",
      "Сайты на Bitrix и проекты на Vue/Nuxt, работа с legacy",
    ],
    link: { label: "crocusgroup.ru", href: "https://crocusgroup.ru/" },
  },
  {
    id: "private",
    company: "Частные проекты",
    role: "Frontend-разработчик",
    period: "2023–2025, параллельно с Crocus Group",
    years: "2023–2025",
    summary: "Greek Legend и Здесь Легко.",
    points: [],
  },
  {
    id: "flexcore",
    company: "Флекскор",
    role: "Frontend-разработчик",
    period: "Сентябрь 2021 — октябрь 2023",
    years: "2021–2023",
    summary:
      "Интернет-магазины, корпоративные и информационные сайты на внутренней CMS.",
    points: [
      "Сайты и интернет-магазины с нуля, редизайн и рефакторинг",
      "Интеграции: подсказки адресов Яндекса, виджет СДЭК",
      "Логистическая платформа PostService, помощь коллегам с CMS",
    ],
    link: { label: "flexcore.ru", href: "https://flexcore.ru/" },
  },
];
