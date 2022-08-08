import React from "react";
import { EducationSchema } from "./types";

import styles from "./Resume.module.css";

interface EducationProps {
  education: EducationSchema[];
}

const Education = ({ education }: EducationProps) => {
  return (
    <section>
      <h2>Education</h2>
      <ul className={styles.nobullet}>
        {education.map((degree, index) => (
          <li key={index}>
            <section className={styles.education}>
              <h3 className={styles.education_area}>{degree.area}</h3>
              <span className={styles.education_description}>
                {degree.studyType}
              </span>
              <span className={styles.education_description}>
                {degree.institution}
              </span>
              <span className={styles.education_description}>
                {degree.startDate} - {degree.endDate}
              </span>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
