import Layout from "@components/Layout";
import { CATEGORIES, Category } from "@helpers/category.helper";
import { getPosts, Post } from "@helpers/post.helper";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import React from "react";

interface BlogPageProps {
  categories: Category[];
  latestPosts: Post[];
}

const BlogPage: NextPage<BlogPageProps> = ({ categories, latestPosts }) => {
  return (
    <Layout>
      <h1>Blog</h1>
      <section>
        <h2>Latest posts</h2>
        <ul>
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.metadata.category}`}>
                {post.metadata.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/blog/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </section>
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
