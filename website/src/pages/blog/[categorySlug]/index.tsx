import Layout from "@components/Layout";
import { CATEGORIES, getCategoryBySlug } from "@helpers/category.helper";
import { getPosts, Post } from "@helpers/post.helper";
import { CANONICAL_DOMAIN } from "@helpers/seo.helper";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface CategoryPageProps {
  categorySlug: string;
  posts: Post[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ categorySlug, posts }) => {
  const category = getCategoryBySlug(categorySlug);
  const { name } = category;
  const canonicalUrl = `${CANONICAL_DOMAIN}/blog/${categorySlug}/`;
  return (
    <Layout>
      <Head>
        <title>{`${name} articles | Benoit Paul`}</title>
        <meta name="description" content={`${name} articles by Benoit Paul`} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <h1>{name}</h1>
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
