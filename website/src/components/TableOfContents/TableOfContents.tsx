import React from "react";
import Link from "next/link";

import { TableOfContentsHeadings } from "@helpers/toc.helper";

import classNames from "classnames";

import styles from "./TableOfContents.module.css";

interface TableOfContentProps {
  headings: TableOfContentsHeadings;
}

const TableOfContents = ({ headings }: TableOfContentProps) => {
  return (
    <aside className={styles.tableOfContents}>
      <nav>
        <h2>Table of contents</h2>
        <ol>
          {headings.map((heading) => (
            <li
              key={heading.slug}
              className={classNames(styles[`level${heading.depth}`])}
            >
              <Link href={`#${heading.slug}`}>{heading.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
};

export default TableOfContents;
