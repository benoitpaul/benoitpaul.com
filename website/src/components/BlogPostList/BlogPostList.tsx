import BlogPostItem from "@components/BlogPostItem";
import { Post } from "@helpers/post.helper";

import styles from "./BlogPostList.module.css";

interface BlogPostListProps {
  posts: Post[];
}

const BlogPostList = ({ posts }: BlogPostListProps) => {
  return (
    <ul className={styles.blogPostList}>
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogPostItem post={post} />
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
