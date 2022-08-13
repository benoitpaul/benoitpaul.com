import BlogPost from "@components/BlogPost";
import Layout from "@components/Layout";
import { getPost, getPosts, Post } from "@helpers/post.helper";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <Layout>
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
      categorySlug: post.metadata.category,
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
