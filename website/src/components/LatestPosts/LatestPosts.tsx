import BlogPostList from "@components/BlogPostList";
import { Post } from "@helpers/post.helper";

import styles from "./LatestPosts.module.css";

interface LatestPostProps {
  latestPosts: Post[];
}

const LatestPosts = ({ latestPosts }: LatestPostProps) => {
  return (
    <section className={styles.latestPosts}>
      <h2>Latest posts</h2>
      <BlogPostList posts={latestPosts} />
    </section>
  );
};

export default LatestPosts;
