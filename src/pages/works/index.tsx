import NoSSR from "@mpth/react-no-ssr";
import { GetServerSideProps } from "next";
import noScroll from "no-scroll";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import Layout from "components/Layout";
import Lightbox, { LightboxProps } from "components/Lightbox";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import WorksTop, { WorksTopProps } from "components/WorksTop";
import client from "libs/client";

export type WorksProps = {
  work: Microcms.Work;
};

function Works({ work: { contents } }: WorksProps): JSX.Element {
  const works = useMemo<WorksTopProps["works"]>(
    () =>
      contents.map(({ description, images, title }) => ({
        title,
        description: description || "",
        images: images.map(({ image: { url } }) => ({
          original: url,
          thumbnail: url,
        })),
      })),
    [contents]
  );
  const [images, setImages] = useState<LightboxProps["images"]>();
  const [photoIndex, setPhotoIndex] = useState<LightboxProps["photoIndex"]>();
  const handleClick = useCallback<NonNullable<WorksTopProps["onClick"]>>(
    ({ target }) => {
      const foundWork = works.find(({ images }) =>
        images.some(({ original }) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((target as any).firstChild.src as string).endsWith(original)
        )
      );

      if (!foundWork) {
        return;
      }

      const { images } = foundWork;

      setImages(images.map(({ original }) => original));

      const index = images.findIndex(({ original }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((target as any).firstChild.src as string).endsWith(original)
      );

      setPhotoIndex(index);
    },
    [works]
  );

  useEffect(() => {
    if (Array.isArray(images) && typeof photoIndex === "number") {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [images, photoIndex]);

  return (
    <>
      <Seo title="WORKS" />
      <NoSSR>
        <WorksTop onClick={handleClick} works={works} />
      </NoSSR>
      {Array.isArray(images) && typeof photoIndex === "number" ? (
        <Lightbox
          images={images}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      ) : null}
    </>
  );
}

Works.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<WorksProps> = async () => {
  const work = await client.get<Microcms.Work>({
    endpoint: "works",
    queries: {
      limit: 100,
    },
  });

  return {
    props: {
      work,
    },
  };
};

export default Works;
