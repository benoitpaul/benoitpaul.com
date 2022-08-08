import Resume from "@components/cv/Resume";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import resume from "@assets/resume.json";
import { ResumeSchema } from "@components/cv/types";

import styles from "@styles/cv.module.css";

interface CVProps {
  resume: ResumeSchema;
}

const CV: NextPage<CVProps> = ({ resume }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CV | Benoit Paul</title>
        <meta name="description" content="Benoit Paul Resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Resume resume={resume} />
      </main>
    </div>
  );
};

export default CV;

export const getStaticProps = () => {
  return {
    props: { resume },
  };
};
