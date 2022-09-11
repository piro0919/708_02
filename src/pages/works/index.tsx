import NoSSR from "@mpth/react-no-ssr";
import { GetStaticProps } from "next";
import noScroll from "no-scroll";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import Layout from "components/Layout";
import Lightbox, { LightboxProps } from "components/Lightbox";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import WorksTop, { WorksTopProps } from "components/WorksTop";
import client from "libs/client";
import { GetWorksData } from "pages/api/works";

function Works(): JSX.Element {
  const { data } = useSWR<GetWorksData>("/api/works");
  const works = useMemo<WorksTopProps["works"]>(
    () =>
      data?.contents.map(({ description, images, title }) => ({
        title,
        description: description || "",
        images: images.map(({ image: { url } }) => ({
          original: url,
          thumbnail: url,
        })),
      })) || [],
    [data?.contents]
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

export type PageProps = {
  fallback: {
    "/api/works": Microcms.Works;
  };
};

function Page({ fallback }: PageProps): JSX.Element {
  return (
    <SWRConfig value={{ fallback }}>
      <Works />
    </SWRConfig>
  );
}

Page.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const works = await client.get<Microcms.Works>({
    endpoint: "works",
    queries: {
      limit: 100,
    },
  });

  return {
    props: {
      fallback: {
        "/api/works": works,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Page;
