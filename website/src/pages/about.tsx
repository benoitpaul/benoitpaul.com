import Head from "next/head";

import Layout from "@components/Layout";
import { CANONICAL_DOMAIN } from "@helpers/seo.helper";

const About = () => {
  const canonicalUrl = `${CANONICAL_DOMAIN}/about/`;
  return (
    <Layout>
      <Head>
        <title>About | Benoit Paul</title>
        <meta name="description" content="Abut Benoit Paul" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      About me (Benoit Paul)
    </Layout>
  );
};

export default About;
