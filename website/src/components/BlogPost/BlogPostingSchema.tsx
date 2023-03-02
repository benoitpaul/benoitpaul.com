import React from "react";

interface BlogPostingSchemaProps {
  headline: string;
  datePublished: Date;
  author: { name: string; url: string };
}

const BlogPostingSchema = ({
  headline,
  datePublished,
  author,
}: BlogPostingSchemaProps) => {
  const content = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: headline,
    datePublished: datePublished,
    author: [
      {
        "@type": "Person",
        name: author.name,
        url: author.url,
      },
    ],
  };

  return (
    <>
      <script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content, null, "\t"),
        }}
      />
    </>
  );
};

export default BlogPostingSchema;
