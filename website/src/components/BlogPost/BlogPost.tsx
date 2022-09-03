import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  getArticleStatistics,
  incrementArticleHitCount,
} from "@api/statistics";
import { Post } from "@helpers/post.helper";

import { useQuery } from "@tanstack/react-query";
import { MDXRemote } from "next-mdx-remote";

import BlogPostHead from "./BlogPostHead";

import styles from "./BlogPost.module.css";

interface BlogPostProps {
  post: Post;
}

const components = {
  img: ({ alt, src, ...rest }: any) => (
    <Image className={styles.image} {...rest} alt={alt} src={src} />
  ),
  table: (props: any) => (
    <div style={{ overflowX: "auto" }}>
      <table {...props} />
    </div>
  ),
};

const BlogPost = ({ post }: BlogPostProps) => {
  const { data: statistics } = useQuery(
    ["getArticleStatistics", post.slug],
    () => getArticleStatistics(post.slug)
  );

  useEffect(() => {
    incrementArticleHitCount(post.slug);
  }, [post.slug]);

  return (
    <article className={styles.blogPost}>
      <header>
        <Link href={`/blog/${post.category}`}>
          <a>{post.categoryName}</a>
        </Link>
        <h1>{post.title}</h1>
        <BlogPostHead post={post} hits={statistics?.hits} />
      </header>

      <MDXRemote {...post.mdxContent} components={components} />
    </article>
  );
};

export default BlogPost;
