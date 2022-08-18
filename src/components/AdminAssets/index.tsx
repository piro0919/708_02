import Image from "next/image";
import { MouseEventHandler, useMemo } from "react";
import styles from "./style.module.scss";

type Illustration = {
  description: string;
  image: string;
  title: string;
};

export type AdminAssetsProps = {
  assets: Illustration[];
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function AdminAssets({ assets, onClick }: AdminAssetsProps): JSX.Element {
  const items = useMemo(
    () =>
      assets.map(({ description, image, title }) => (
        <li className={styles.item} key={image}>
          <Image
            alt={title}
            height={240}
            objectFit="contain"
            src={image}
            width={240}
          />
          <span className={styles.titleWrapper}>{title}</span>
          <p className={styles.descriptionWrapper}>{description}</p>
        </li>
      )),
    [assets]
  );

  return (
    <div className={styles.wrapper}>
      <div>
        <button className={styles.button} onClick={onClick}>
          追加する
        </button>
      </div>
      <hr className={styles.hr} />
      <ul className={styles.list}>{items}</ul>
    </div>
  );
}

export default AdminAssets;
