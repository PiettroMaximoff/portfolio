import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { stackSection } from "@/data/stack";
import { DigitalRain } from "./DigitalRain";
import styles from "./StackSection.module.css";

export function StackSection() {
  const { kicker, title, description, blocks } = stackSection;

  return (
    <section id="skills" className={`section ${styles.section}`}>
      <DigitalRain />
      <div className={`wrap ${styles.wrap}`}>
        <Reveal>
          <div className={styles.intro}>
            <p className="kicker">{kicker}</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 0.05} className={styles.cellReveal}>
              <article className={styles.cell}>
                <div className={styles.cellHead}>
                  <span className={styles.icon}>
                    <Icon name={block.icon} />
                  </span>
                  <p className={styles.eyebrow}>{block.eyebrow}</p>
                </div>
                <h3>{block.title}</h3>

                <ul className={styles.tags}>
                  {block.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
