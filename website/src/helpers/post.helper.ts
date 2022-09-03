import * as fs from "fs";

import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import imageSize from "rehype-img-size";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { getCategoryName } from "./category.helper";

interface getPostsParams {
  categorySlug?: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  publishedDate?: string;
  updatedDate?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  categoryName: string;
  readingTimeText: string;
  readingTimeMinutes: number;
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
        ...(data as PostFrontmatter),
        categoryName: getCategoryName((data as PostFrontmatter).category),
        readingTimeText: readingTime(content).text,
        readingTimeMinutes: readingTime(content).minutes,
        mdxContent: mdxSource,
      };
    })
  );

  const posts = allPosts.filter((post) => {
    if (!params || !params.categorySlug) {
      return true;
    }
    return post.category === params.categorySlug;
  });

  return posts;
};

export const getPost = async (postSlug: string): Promise<Post> => {
  const source = fs.readFileSync(`posts/${postSlug}/index.mdx`, "utf-8");
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // use the image size plugin, you can also specify which folder to load images from
      // in my case images are in /public/images/, so I just prepend 'public'
      rehypePlugins: [
        //@ts-ignore
        [imageSize, { dir: "public" }],
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypePrism,
      ],
      format: "mdx",
    },
  });

  return {
    slug: postSlug,
    ...(data as PostFrontmatter),
    categoryName: getCategoryName((data as PostFrontmatter).category),
    readingTimeText: readingTime(content).text,
    readingTimeMinutes: readingTime(content).minutes,
    mdxContent: mdxSource,
  };
};
