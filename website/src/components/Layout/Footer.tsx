import { RiGithubLine, RiLinkedinBoxLine, RiTwitterLine } from "react-icons/ri";
import Link from "next/link";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <Link href="https://github.com/benoitpaul" target="_blank">
          <RiGithubLine title="Benoit Paul's Github" />
        </Link>
        <Link href="https://www.linkedin.com/in/benoitpaul/" target="_blank">
          <RiLinkedinBoxLine title="Benoit Paul's LinkedIn" />
        </Link>
        <Link href="https://twitter.com/benoitpaul" target="_blank">
          <RiTwitterLine title="Benoit Paul's Twitter" />
        </Link>
      </div>
      <div className={styles.copyright}>
        @ 2022 - present Benoit Paul. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
