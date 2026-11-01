import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./AboutSection.module.css";

type FocusItem = {
  index: string;
  text: string;
};

type HighlightItem = {
  title: string;
  text: string;
  icon: "code" | "spark" | "layers";
};

const focuses: FocusItem[] = [
  { index: "01", text: "Проектирование и архитектура" },
  { index: "02", text: "SPA на React, TypeScript и Next.js" },
  { index: "03", text: "Сложные формы, дашборды, интеграции" },
  { index: "04", text: "Отладка и производительность" },
];

const highlights: HighlightItem[] = [
  {
    icon: "code",
    title: "5 лет опыта",
    text: "От интернет-магазинов и корпоративных сайтов до аналитической платформы.",
  },
  {
    icon: "spark",
    title: "AI-инструменты",
    text: "LLM-ассистенты и AI-редакторы помогают на этапах от проектирования до отладки. Решения и итоговый код остаются за мной.",
  },
  {
    icon: "layers",
    title: "Больше, чем просто вёрстка",
    text: "Интеграции с REST API, 1С и Bitrix24, автоматизация публикации контента, задачи напрямую с маркетингом.",
  },
];

export function AboutSection() {
  return (
    <section id="approach" className={`section ${styles.section}`}>
      <div className={`wrap ${styles.wrap}`}>
        <Reveal>
          <div className={styles.intro}>
            <h2>Frontend. Сложные интерфейсы.</h2>
            <p>
              Собираю интерфейс и клиентскую логику — от первого компонента до{" "}
              <span className="fill-static">сданного экрана</span>.
            </p>
          </div>
        </Reveal>

        <div className={styles.body}>
          <Reveal delay={0.06}>
            <div className={styles.bio}>
              <p>
                Frontend-разработчик,{" "}
                <span className="fill-static">5 лет</span> коммерческой разработки.
                Основной стек — React и TypeScript, по задаче — Next.js, Vue/Nuxt
                или Bitrix.
              </p>
              <p>
                Разработал аналитическую платформу, внутренний портал, интерактивную
                карту торгового центра, корпоративные сайты и интернет-магазины.
              </p>
              <p>
                Когда задача выходит за рамки фронтенда — интеграция с 1С, AI-автоматизация, выгрузка
                контента через API, сбор статистики соцсетей.
              </p>
            </div>
          </Reveal>

          <ul className={styles.focuses}>
            {focuses.map((item, index) => (
              <li key={item.index}>
                <Reveal delay={0.08 + index * 0.05}>
                  <div className={styles.focusRow}>
                    <span className={styles.focusIndex}>{item.index}</span>
                    <span className={styles.focusText}>{item.text}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.highlights}>
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className={styles.highlight}>
                <span className={styles.highlightIcon}>
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
