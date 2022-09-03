import { FC, PropsWithChildren } from "react";

import Footer from "./Footer";
import Header from "./Header";

import styles from "./Layout.module.css";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
