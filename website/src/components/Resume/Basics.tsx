import { BasicsSchema } from "./types";

import styles from "./Basics.module.css";

interface BasicsProps {
  basics: BasicsSchema;
}

const Basics = ({ basics }: BasicsProps) => {
  const { name, label } = basics;
  return (
    <section>
      <h1>{name}</h1>
      <span className={styles.label}>{label}</span>
    </section>
  );
};

export default Basics;
