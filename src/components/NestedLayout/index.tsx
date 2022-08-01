import { ReactNode } from "react";
import styles from "./style.module.scss";

export type NestedLayoutProps = {
  children: ReactNode;
};

function NestedLayout({ children }: NestedLayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading1}>7:08</h1>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default NestedLayout;
