import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

function Top(): JSX.Element {
  const { height } = useWindowSize();

  return (
    <div className={styles.wrapper} style={{ height }}>
      <h1 className={styles.heading1}>7:08</h1>
    </div>
  );
}

export default Top;
