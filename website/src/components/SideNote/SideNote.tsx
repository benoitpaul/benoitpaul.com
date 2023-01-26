import { PropsWithChildren } from "react";

import classNames from "classnames";

import styles from "./SideNote.module.css";

type SideNoteType = "info" | "success" | "warning";

interface SideNoteProps extends PropsWithChildren {
  type: SideNoteType;
  title: string;
}

const SideNote = ({ type = "info", title, children }: SideNoteProps) => {
  return (
    <aside className={classNames(styles.sideNote, styles[type])}>
      {title && <strong className={styles.title}>{title}</strong>}
      {children}
    </aside>
  );
};

export default SideNote;
