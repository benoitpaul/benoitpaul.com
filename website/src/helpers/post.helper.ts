import * as fs from "fs";

import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import imageSize from "rehype-img-size";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

import { getCategoryName } from "./category.helper";
import { getHeadings, TableOfContentsHeadings } from "./toc.helper";

const LATEST_POSTS_COUNT = 3;

interface getPostsParams {
  categorySlug?: string;
  latest?: boolean;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  publishedDate: string;
  updatedDate?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  categoryName: string;
  readingTimeText: string;
  readingTimeMinutes: number;
  mdxContent: any;
  tableOfContents: TableOfContentsHeadings;
}

export const getPosts = async (params?: getPostsParams): Promise<Post[]> => {
  const files = fs.readdirSync("posts");
  const allPosts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(".mdx", "");
      return getPost(slug);
    })
  );

  const postsSortedByDate = allPosts.sort(comparePostsByDate);

  const postsFilteredByCategory = postsSortedByDate.filter((post) => {
    if (!params || !params.categorySlug) {
      return true;
    }
    return post.category === params.categorySlug;
  });

  const latestPosts = params?.latest
    ? postsFilteredByCategory.slice(
        0,
        Math.min(LATEST_POSTS_COUNT, postsFilteredByCategory.length)
      )
    : postsFilteredByCategory;

  return latestPosts;
};

export const getPost = async (postSlug: string): Promise<Post> => {
  const source = fs.readFileSync(`posts/${postSlug}.mdx`, "utf-8");
  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkEmoji],
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
    tableOfContents: getHeadings(content),
    mdxContent: mdxSource,
  };
};

const comparePostsByDate = (a: Post, b: Post) => {
  if (a.publishedDate > b.publishedDate) {
    return -1;
  }
  if (a.publishedDate < b.publishedDate) {
    return 1;
  }
  return 0;
};
