import NoSSR from "@mpth/react-no-ssr";
import { Entry } from "contentful";
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
  workItems: Entry<Contentful.IWorksFields>[];
};

function Works({ workItems }: WorksProps): JSX.Element {
  const works = useMemo<WorksTopProps["works"]>(
    () =>
      workItems.map(({ fields: { description, images, title } }) => ({
        description,
        title,
        images: images.map(
          ({
            fields: {
              file: { url },
            },
          }) => ({
            original: url,
            thumbnail: url,
          })
        ),
      })),
    [workItems]
  );
  const [images, setImages] = useState<LightboxProps["images"]>();
  const [photoIndex, setPhotoIndex] = useState<LightboxProps["photoIndex"]>();
  const handleClick = useCallback<NonNullable<WorksTopProps["onClick"]>>(
    ({ target }) => {
      const foundWork = works.find(({ images }) =>
        images.some(({ original }) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((target as any).src as string).endsWith(original)
        )
      );

      if (!foundWork) {
        return;
      }

      const { images } = foundWork;

      setImages(images.map(({ original }) => original));

      const index = images.findIndex(({ original }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((target as any).src as string).endsWith(original)
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
  const { items: workItems } = await client.getEntries<Contentful.IWorksFields>(
    {
      content_type: "works" as Contentful.CONTENT_TYPE,
    }
  );

  return {
    props: {
      workItems,
    },
  };
};

export default Works;
