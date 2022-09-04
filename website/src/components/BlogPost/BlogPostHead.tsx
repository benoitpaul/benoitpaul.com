import Link from "next/link";

import HitCount from "@components/HitCount";
import { Post } from "@helpers/post.helper";

import { format, parseISO } from "date-fns";

import styles from "./BlogPostHead.module.css";

interface BlogPostHeadProps {
  post: Post;
  hits?: number;
}

const BlogPostHead = ({ post, hits }: BlogPostHeadProps) => {
  const readingTimeIso8601 = `PT${Math.round(post.readingTimeMinutes)}M`;
  return (
    <div className={styles.blogPostHead}>
      <div className={styles.leftColumn}>
        <Link href="/about">
          <a rel="author" title="Go to author page">
            Benoit Paul
          </a>
        </Link>
        <div>
          <time dateTime={post.publishedDate}>
            {format(parseISO(post.publishedDate), "MMMM dd, yyyy")}
          </time>
          <time dateTime={readingTimeIso8601}>{post.readingTimeText}</time>
        </div>
      </div>
      <div>
        <HitCount hits={hits} />
      </div>
    </div>
  );
};

export default BlogPostHead;
