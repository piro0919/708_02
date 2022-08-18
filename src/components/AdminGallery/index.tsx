import Image from "next/image";
import { MouseEventHandler, useMemo } from "react";
import styles from "./style.module.scss";

type Illustration = {
  image: string;
  title: string;
};

export type AdminGalleryProps = {
  illustrations: Illustration[];
  onOpen: MouseEventHandler<HTMLButtonElement>;
};

function AdminGallery({
  illustrations,
  onOpen,
}: AdminGalleryProps): JSX.Element {
  const items = useMemo(
    () =>
      illustrations.map(({ image, title }) => (
        <li className={styles.item} key={image}>
          <Image
            alt={title}
            height={240}
            objectFit="contain"
            src={image}
            width={240}
          />
          <span className={styles.titleWrapper}>{title}</span>
        </li>
      )),
    [illustrations]
  );

  return (
    <div className={styles.wrapper}>
      <div>
        <button className={styles.button} onClick={onOpen}>
          追加する
        </button>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.list}>{items}</ul>
    </div>
  );
}

export default AdminGallery;
