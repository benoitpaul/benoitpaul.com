import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  getArticleStatistics,
  incrementArticleHitCount,
} from "@api/statistics";
import SideNote from "@components/SideNote";
import { Post } from "@helpers/post.helper";

import { useQuery } from "@tanstack/react-query";
import { MDXRemote } from "next-mdx-remote";

import BlogPostHead from "./BlogPostHead";

import styles from "./BlogPost.module.css";

interface BlogPostProps {
  post: Post;
}

const components = {
  img: ({ alt, src, width, height, ...rest }: any) => (
    <Image
      className={styles.image}
      width={width || 500}
      height={height || 500}
      {...rest}
      alt={alt}
      src={src}
    />
  ),

  table: (props: any) => (
    <div style={{ overflowX: "auto" }}>
      <table {...props} />
    </div>
  ),

  SideNote: (props: any) => <SideNote {...props} />,
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
        <Link href={`/blog/${post.category}`}>{post.categoryName}</Link>
        <h1>{post.title}</h1>
        <BlogPostHead post={post} hits={statistics?.hits} />
      </header>

      <MDXRemote {...post.mdxContent} components={components} />
    </article>
  );
};

export default BlogPost;
