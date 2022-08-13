import * as fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

interface getPostsParams {
  categorySlug?: string;
}

export interface PostMetadata {
  title: string;
  description: string;
  category: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  mdxContent: any;
}

export const getPosts = async (params?: getPostsParams): Promise<Post[]> => {
  const folders = fs.readdirSync("posts");
  const allPosts = await Promise.all(
    folders.map(async (folderName) => {
      const slug = folderName;
      const source = fs.readFileSync(`posts/${folderName}/index.mdx`, "utf-8");
      const { data, content } = matter(source);
      const mdxSource = await serialize(content);

      return {
        slug,
        metadata: data as PostMetadata,
        mdxContent: mdxSource,
      };
    })
  );

  const posts = allPosts.filter((post) => {
    if (!params || !params.categorySlug) {
      return true;
    }
    return post.metadata.category === params.categorySlug;
  });

  return posts;
};

export const getPost = async (postSlug: string): Promise<Post> => {
  const source = fs.readFileSync(`posts/${postSlug}/index.mdx`, "utf-8");
  const { data, content } = matter(source);
  const mdxSource = await serialize(content);

  return {
    slug: postSlug,
    metadata: data as PostMetadata,
    mdxContent: mdxSource,
  };
};
