import { GetServerSideProps } from "next";
import noScroll from "no-scroll";
import { ReactElement, useEffect, useMemo, useState } from "react";
import GalleryTop, { GalleryTopProps } from "components/GalleryTop";
import Layout from "components/Layout";
import Lightbox, { LightboxProps } from "components/Lightbox";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import client from "libs/client";

export type GalleryProps = {
  illustratoration: Microcms.Illustratoration;
};

function Gallery({
  illustratoration: { contents },
}: GalleryProps): JSX.Element {
  const [photoIndex, setPhotoIndex] = useState<LightboxProps["photoIndex"]>();
  const illustrations = useMemo<GalleryTopProps["illustrations"]>(
    () =>
      contents.map(({ image: { url }, title }, index) => ({
        title,
        image: url,
        onClick: (): void => {
          setPhotoIndex(index);
        },
      })),
    [contents]
  );
  const images = useMemo<LightboxProps["images"]>(
    () => illustrations.map(({ image }) => image),
    [illustrations]
  );

  useEffect(() => {
    if (typeof photoIndex === "number") {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [photoIndex]);

  return (
    <>
      <Seo title="GALLERY" />
      <GalleryTop illustrations={illustrations} />
      {typeof photoIndex === "number" ? (
        <Lightbox
          images={images}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      ) : null}
    </>
  );
}

Gallery.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  GalleryProps
> = async () => {
  const illustratoration = await client.get<Microcms.Illustratoration>({
    endpoint: "illustratorations",
    queries: {
      limit: 100,
    },
  });

  return {
    props: {
      illustratoration,
    },
  };
};

export default Gallery;
