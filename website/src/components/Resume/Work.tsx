import React from "react";
import { WorkSchema } from "./types";

import styles from "./Resume.module.css";
import classNames from "classnames";

interface WorkProps {
  work: WorkSchema[];
}

const Work = ({ work }: WorkProps) => {
  return (
    <section>
      <h2>Experience</h2>
      <ul className={styles.nobullet}>
        {work.map((experience, index) => (
          <li key={index}>
            <section className={styles.experience}>
              <h3 className={styles.experience_position}>
                {experience.position}
              </h3>
              <span className={styles.experience_name}>
                <a href={experience.url}>{experience.name}</a>
              </span>
              <span className={styles.experience_description}>
                {experience.startDate} - {experience.endDate}
              </span>
              <span className={styles.experience_summary}>
                {experience.summary}
              </span>
              <ul className={styles.experience_highlights}>
                {experience.highlights?.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
              <ul className={styles.experience_tags}>
                {experience.tags?.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Work;
