import LatestPosts from "@components/LatestPosts";
import Layout from "@components/Layout";
import { getPosts, Post } from "@helpers/post.helper";

import type { GetStaticProps, NextPage } from "next";

import styles from "@styles/Home.module.css";

interface HomePageProps {
  latestPosts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({ latestPosts }) => (
  <Layout>
    <div className={styles.home}>
      <section>
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
      </section>
      <LatestPosts latestPosts={latestPosts} />
    </div>
  </Layout>
);

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const latestPosts = await getPosts();
  return {
    props: {
      latestPosts,
    },
  };
};
