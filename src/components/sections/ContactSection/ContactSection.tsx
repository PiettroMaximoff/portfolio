import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/site";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal>
          <div className={`glass ${styles.panel}`}>
            <p className="kicker">Контакты</p>
            <h2>Давайте свяжемся</h2>
            <p>
              Открыт к роли frontend-/web-разработчика. Удалёнка, гибрид или офис в Москве.
            </p>
            <div className={styles.links}>
              <a className={styles.tile} href="mailto:ukhlin.vladislav@yandex.ru">
                <span className={styles.icon}>
                  <Icon name="mail" />
                </span>
                <span>
                  <span className={styles.label}>Почта</span>
                  <span className={styles.value}>ukhlin.vladislav@yandex.ru</span>
                </span>
              </a>
              <a
                className={styles.tile}
                href="https://t.me/hi_lm_poultry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.icon}>
                  <Icon name="telegram" />
                </span>
                <span>
                  <span className={styles.label}>Telegram</span>
                  <span className={styles.value}>t.me/hi_lm_poultry</span>
                </span>
              </a>
              <a
                className={styles.tile}
                href="https://hh.ru/resume/2a1f2879ff08ce5dd90039ed1f6b7770774a4b"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.icon} aria-hidden="true">
                  hh
                </span>
                <span>
                  <span className={styles.label}>Резюме на HH</span>
                  <span className={styles.value}>Открыть профиль</span>
                </span>
              </a>
              <a className={`${styles.tile} ${styles.download}`} href={withBasePath("/resume.pdf")} download>
                <span className={styles.icon}>
                  <Icon name="download" />
                </span>
                <span>
                  <span className={styles.label}>Скачать резюме</span>
                  <span className={styles.value}>PDF</span>
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
