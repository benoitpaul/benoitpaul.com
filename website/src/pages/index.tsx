import Layout from "@components/Layout";

import type { NextPage } from "next";

const HomePage: NextPage = () => (
  <Layout>
    <h1>
      Hi, I&apos;m Benoit{" "}
      <span role="img" aria-label="Waving hand">
        👋
      </span>
    </h1>
    <strong>
      Freelance fullstack developer from Canada{" "}
      <span role="img" aria-label="Canada flag">
        🇨🇦
      </span>
    </strong>
  </Layout>
);

export default HomePage;
