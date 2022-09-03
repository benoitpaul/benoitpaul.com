import { NextPage } from "next";
import Head from "next/head";

import resume from "@assets/resume.json";
import Layout from "@components/Layout";
import Resume from "@components/Resume";
import { ResumeSchema } from "@components/Resume/types";

interface CVProps {
  resume: ResumeSchema;
}

const CV: NextPage<CVProps> = ({ resume }) => {
  return (
    <Layout>
      <Head>
        <title>CV | Benoit Paul</title>
        <meta name="description" content="Benoit Paul Resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Resume resume={resume} />
    </Layout>
  );
};

export default CV;

export const getStaticProps = () => {
  return {
    props: { resume },
  };
};
