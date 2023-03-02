import React from "react";

import { BreadcrumbList } from "./types";

interface BreadcrumbSchemaProps {
  breadcrumbList: BreadcrumbList;
}

const BreadcrumbSchema = ({ breadcrumbList }: BreadcrumbSchemaProps) => {
  const content = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.url,
        name: item.name,
      },
    })),
  };

  return (
    <>
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content, null, "\t"),
        }}
      />
    </>
  );
};

export default BreadcrumbSchema;
