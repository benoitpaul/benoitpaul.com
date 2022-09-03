import { Post } from "./post.helper";

export const getPostUrl = (post: Post) => {
  return `/blog/${post.category}/${post.slug}/`;
};
