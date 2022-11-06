import { MENU } from "@helpers/menu.helper";

import ActiveLink from "./ActiveLink";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        {MENU.map((menuItem) => (
          <ActiveLink
            key={menuItem.href}
            href={menuItem.href}
            activeClassName={styles.active}
          >
            <>{menuItem.label}</>
          </ActiveLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
