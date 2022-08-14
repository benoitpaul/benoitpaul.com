import { Post } from "@helpers/post.helper";
import { getPostUrl } from "@helpers/url.helper";
import Link from "next/link";

import styles from "./BlogPostItem.module.css";

interface BlogPostItemProps {
  post: Post;
}

const BlogPostItem = ({ post }: BlogPostItemProps) => {
  const postUrl = getPostUrl(post);
  return (
    <Link href={postUrl}>
      <a className={styles.blogPostItem}>
        <h4>{post.metadata.title}</h4>
        <p>{post.metadata.description}</p>
      </a>
    </Link>
  );
};

export default BlogPostItem;
