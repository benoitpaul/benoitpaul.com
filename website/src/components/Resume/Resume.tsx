import React from "react";
import Basics from "./Basics";
import Contact from "./Contact";
import Education from "./Education";
import Introduction from "./Introduction";
import Profiles from "./Profiles";
import { ResumeSchema } from "./types";
import Work from "./Work";

import styles from "./Resume.module.css";

interface ResumeProps {
  resume: ResumeSchema;
}

const Resume = ({ resume }: ResumeProps) => {
  const { basics, education, work } = resume;
  return (
    <article className={styles.resume}>
      <Basics basics={basics} />
      <Contact basics={basics} />
      {basics.profiles && <Profiles profiles={basics.profiles} />}
      {basics.summary && <Introduction summary={basics.summary} />}
      <Work work={resume.work} />
      <Education education={education} />
    </article>
  );
};

export default Resume;
