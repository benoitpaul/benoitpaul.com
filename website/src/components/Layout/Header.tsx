import React from "react";
import { MENU } from "@helpers/menu.helper";
import Link from "next/link";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        {MENU.map((menuItem) => (
          <Link key={menuItem.href} href={menuItem.href}>
            {menuItem.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
