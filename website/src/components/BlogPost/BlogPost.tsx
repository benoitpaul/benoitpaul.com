import { useEffect } from "react";
import Image from "next/image";

import {
  getArticleStatistics,
  incrementArticleHitCount,
} from "@api/statistics";
import Breadcrumb from "@components/Breadcrumb";
import SideNote from "@components/SideNote";
import TableOfContents from "@components/TableOfContents";
import { Post } from "@helpers/post.helper";

import { useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { MDXRemote } from "next-mdx-remote";

import BlogPostHead from "./BlogPostHead";
import BlogPostingSchema from "./BlogPostingSchema";

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

  const breadcrumbList = [
    { name: "Blog", url: "/blog/" },
    { name: post.categoryName, url: `/blog/${post.category}` },
  ];

  return (
    <article className={styles.blogPost}>
      <BlogPostingSchema
        headline={post.title}
        datePublished={parseISO(post.publishedDate)}
        author={{
          name: "Benoit Paul",
          url: "https://www.benoitpaul.com/about/",
        }}
      />
      <header>
        <Breadcrumb breadcrumbList={breadcrumbList} />
        <h1>{post.title}</h1>
        <BlogPostHead post={post} hits={statistics?.hits} />
      </header>
      <TableOfContents headings={post.tableOfContents} />

      <section className={styles.content}>
        <MDXRemote {...post.mdxContent} components={components} />
      </section>
    </article>
  );
};

export default BlogPost;
