import Categories from "@components/Categories";
import LatestPosts from "@components/LatestPosts";
import Layout from "@components/Layout";
import { CATEGORIES, Category } from "@helpers/category.helper";
import { getPosts, Post } from "@helpers/post.helper";
import { GetStaticProps, NextPage } from "next";

import styles from "@styles/Blog.module.css";

interface BlogPageProps {
  categories: Category[];
  latestPosts: Post[];
}

const BlogPage: NextPage<BlogPageProps> = ({ categories, latestPosts }) => {
  return (
    <Layout>
      <div className={styles.blog}>
        <h1>Blog</h1>
        <LatestPosts latestPosts={latestPosts} />
        <Categories categories={categories} />
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const latestPosts = await getPosts();
  return {
    props: {
      categories: CATEGORIES,
      latestPosts,
    },
  };
};
