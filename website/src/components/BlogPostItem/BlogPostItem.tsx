import Link from "next/link";

import { Post } from "@helpers/post.helper";
import { getPostUrl } from "@helpers/url.helper";

import { format, parseISO } from "date-fns";

import styles from "./BlogPostItem.module.css";

interface BlogPostItemProps {
  post: Post;
}

const BlogPostItem = ({ post }: BlogPostItemProps) => {
  const postUrl = getPostUrl(post);
  return (
    <Link href={postUrl}>
      <a className={styles.blogPostItem}>
        <header>
          <h4>{post.title}</h4>
          <time dateTime={post.publishedDate}>
            {format(parseISO(post.publishedDate), "MMMM dd, yyyy")}
          </time>
        </header>
        <p>{post.description}</p>
      </a>
    </Link>
  );
};

export default BlogPostItem;
