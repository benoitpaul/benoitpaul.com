import BlogPostItem from "@components/BlogPostItem";
import { Post } from "@helpers/post.helper";

import styles from "./LatestPosts.module.css";

interface LatestPostProps {
  latestPosts: Post[];
}

const LatestPost = ({ latestPosts }: LatestPostProps) => {
  return (
    <section className={styles.latestPosts}>
      <h2>Latest posts</h2>
      <ul className="nobullet">
        {latestPosts.map((post) => (
          <li key={post.slug}>
            <BlogPostItem post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestPost;
