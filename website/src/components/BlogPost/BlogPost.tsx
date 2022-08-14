import { MDXRemote } from "next-mdx-remote";
import { Post } from "@helpers/post.helper";

import styles from "./BlogPost.module.css";

interface BlogPostProps {
  post: Post;
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <article className={styles.blogPost}>
      <MDXRemote {...post.mdxContent} />
    </article>
  );
};

export default BlogPost;
