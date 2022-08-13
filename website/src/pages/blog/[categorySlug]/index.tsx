import Layout from "@components/Layout";
import { CATEGORIES } from "@helpers/category.helper";
import { getPosts, Post } from "@helpers/post.helper";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface CategoryPageProps {
  categorySlug: string;
  posts: Post[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ categorySlug, posts }) => {
  return (
    <Layout>
      <h1>{categorySlug}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${categorySlug}/${post.slug}`}>
              {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default CategoryPage;

interface Params extends ParsedUrlQuery {
  categorySlug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = CATEGORIES.map((cat) => ({
    params: {
      categorySlug: cat.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  CategoryPageProps,
  Params
> = async ({ params }) => {
  const posts = await getPosts({
    categorySlug: params!.categorySlug,
  });

  return {
    props: {
      categorySlug: params!.categorySlug,
      posts,
    },
  };
};
