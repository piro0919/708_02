import Image from "next/image";
import { MouseEventHandler, useMemo } from "react";
import usePortal from "react-cool-portal";
import { IoMdClose } from "react-icons/io";
import styles from "./style.module.scss";

type Asset = {
  onClick: MouseEventHandler<HTMLLIElement>;
  url: string;
};

export type NewGalleryPortalProps = {
  assets: Asset[];
  onClose: MouseEventHandler<HTMLButtonElement>;
};

function NewGalleryPortal({
  assets,
  onClose,
}: NewGalleryPortalProps): JSX.Element {
  const { Portal } = usePortal();
  const items = useMemo(
    () =>
      assets.map(({ onClick, url }) => (
        <li className={styles.item} key={url} onClick={onClick}>
          <Image
            alt={url}
            height={240}
            objectFit="contain"
            src={url}
            width={240}
          />
        </li>
      )),
    [assets]
  );

  return (
    <Portal>
      <div className={styles.wrapper}>
        <ul className={styles.list}>{items}</ul>
        <div className={styles.buttonWrapper}>
          <button onClick={onClose}>
            <IoMdClose size={36} />
          </button>
        </div>
      </div>
    </Portal>
  );
}

export default NewGalleryPortal;
