import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { useMemo } from "react";
import ImageGallery, { ReactImageGalleryProps } from "react-image-gallery";
import { useElementSize } from "usehooks-ts";
import styles from "./style.module.scss";
import Article from "components/Article";

type Work = {
  description: Document;
  images: ReactImageGalleryProps["items"];
  title: string;
};

export type WorksTopProps = Pick<ReactImageGalleryProps, "onClick"> & {
  works: Work[];
};

function WorksTop({ onClick, works }: WorksTopProps): JSX.Element {
  const [ref, { width }] = useElementSize<HTMLUListElement>();
  const items = useMemo(
    () =>
      works.map(({ description, images, title }, index) => (
        <li key={index}>
          <div style={{ width }}>
            <ImageGallery
              additionalClass={styles.imageGallery}
              infinite={true}
              items={images}
              onClick={onClick}
              showFullscreenButton={false}
              showPlayButton={false}
            />
            <h3 className={styles.heading3}>{title}</h3>
            <div>{documentToReactComponents(description)}</div>
          </div>
        </li>
      )),
    [onClick, width, works]
  );

  return (
    <Article heading="WORKS">
      <ul className={styles.list} ref={ref}>
        {items}
      </ul>
    </Article>
  );
}

export default WorksTop;
