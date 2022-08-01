import Image from "next/image";
import { MouseEventHandler, useMemo } from "react";
import styles from "./style.module.scss";
import Article from "components/Article";

type Illustration = {
  image: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  title: string;
};

export type GalleryTopProps = {
  illustrations: Illustration[];
};

function GalleryTop({ illustrations }: GalleryTopProps): JSX.Element {
  const items = useMemo(
    () =>
      illustrations.map(({ image, onClick, title }) => (
        <li key={image}>
          <div className={styles.imageWrapper} onClick={onClick}>
            <Image alt={title} layout="fill" objectFit="cover" src={image} />
          </div>
        </li>
      )),
    [illustrations]
  );

  return (
    <Article heading="GALLERY">
      <ul className={styles.list}>{items}</ul>
    </Article>
  );
}

export default GalleryTop;
