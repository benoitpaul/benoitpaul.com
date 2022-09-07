import { RiGithubLine, RiLinkedinBoxLine, RiTwitterLine } from "react-icons/ri";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <Link href="https://github.com/benoitpaul">
          <a>
            <RiGithubLine title="Benoit Paul's Github" />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/benoitpaul/">
          <a>
            <RiLinkedinBoxLine title="Benoit Paul's LinkedIn" />
          </a>
        </Link>
        <Link href="https://twitter.com/benoitpaul">
          <a>
            <RiTwitterLine title="Benoit Paul's Twitter" />
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
