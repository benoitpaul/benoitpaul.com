import { NextPage } from "next";
import Head from "next/head";

import resume from "@assets/resume.json";
import Layout from "@components/Layout";
import Resume from "@components/Resume";
import { ResumeSchema } from "@components/Resume/types";
import { CANONICAL_DOMAIN } from "@helpers/seo.helper";

interface CVProps {
  resume: ResumeSchema;
}

const CV: NextPage<CVProps> = ({ resume }) => {
  const canonicalUrl = `${CANONICAL_DOMAIN}/cv/`;
  return (
    <Layout>
      <Head>
        <title>CV | Benoit Paul</title>
        <meta name="description" content="Benoit Paul Resume" />
        <link rel="canonical" href={canonicalUrl} />
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
