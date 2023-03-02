import GithubSlugger from "github-slugger";

export interface TableOfContentsHeading {
  depth: number;
  title: string;
  slug: string;
}

export type TableOfContentsHeadings = TableOfContentsHeading[];

const slugger = new GithubSlugger();

const isHeading = (mdxLine: string) => {
  const trimmed = mdxLine.trim();
  return (
    trimmed.startsWith("## ") ||
    trimmed.startsWith("### ") ||
    trimmed.startsWith("#### ") ||
    trimmed.startsWith("##### ") ||
    trimmed.startsWith("###### ")
  );
};

export const getHeadings = (mdxContent: string): TableOfContentsHeadings => {
  const headingLines = mdxContent.split("\n").filter(isHeading);
  return headingLines.map((line) => {
    const depth = line.split(" ", 1)[0].length; // count number of "#"
    const title = line.slice(depth).trim(); // extract the characters after all the "#"
    const slug = slugger.slug(title); // same slugger as rehypeSlug

    return {
      depth,
      title,
      slug,
    };
  });
};
