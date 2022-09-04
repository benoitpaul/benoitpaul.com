import { RiGithubLine, RiLinkedinBoxLine, RiTwitterLine } from "react-icons/ri";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <Link href="https://github.com/benoitpaul">
          <a>
            <RiGithubLine />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/benoitpaul/">
          <a>
            <RiLinkedinBoxLine />
          </a>
        </Link>
        <Link href="https://twitter.com/benoitpaul">
          <a>
            <RiTwitterLine />
          </a>
        </Link>
      </div>
      <div className={styles.copyright}>
        @ 2022 - present Benoit Paul. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
