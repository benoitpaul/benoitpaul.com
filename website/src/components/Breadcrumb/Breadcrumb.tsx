import React, { ReactNode } from "react";
import Link from "next/link";

import BreadcrumbJsonLd from "./BreadcrumbJsonLd";
import { BreadcrumbList } from "./types";

interface BreadcrumbProps {
  breadcrumbList: BreadcrumbList;
}

import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ breadcrumbList }: BreadcrumbProps) => {
  return (
    <>
      <BreadcrumbJsonLd breadcrumbList={breadcrumbList} />
      <ol className={styles.breadcrumb}>
        {breadcrumbList.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>{item.name}</Link>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Breadcrumb;
