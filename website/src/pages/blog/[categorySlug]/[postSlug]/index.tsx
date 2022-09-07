import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import BlogPost from "@components/BlogPost";
import Layout from "@components/Layout";
import { getPost, getPosts, Post } from "@helpers/post.helper";
import { CANONICAL_DOMAIN } from "@helpers/seo.helper";

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const canonicalUrl = `${CANONICAL_DOMAIN}/blog/${post.category}/${post.slug}/`;
  return (
    <Layout>
      <Head>
        <title>{`${post.title} | Benoit Paul`}</title>
        <meta name="description" content={post.description} />
        <meta name="author" content="Benoit Paul" />.
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <BlogPost post={post} />
    </Layout>
  );
};

export default PostPage;

interface Params extends ParsedUrlQuery {
  postSlug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getPosts();
  const paths = posts.map((post) => ({
    params: {
      categorySlug: post.category,
      postSlug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async ({
  params,
}) => {
  const post = await getPost(params!.postSlug);

  return {
    props: {
      post,
    },
  };
};
