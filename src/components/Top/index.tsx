import Image from "next/image";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

function Top(): JSX.Element {
  const { height } = useWindowSize();

  return (
    <div className={styles.wrapper} style={{ height }}>
      <div className={styles.imageWrapper}>
        <Image alt="7:08" layout="fill" src="/top.jpg" />
      </div>
      <h1 className={styles.heading1}>7:08</h1>
    </div>
  );
}

export default Top;
