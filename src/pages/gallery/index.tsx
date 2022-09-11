import { GetStaticProps } from "next";
import noScroll from "no-scroll";
import { ReactElement, useEffect, useMemo, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import GalleryTop, { GalleryTopProps } from "components/GalleryTop";
import Layout from "components/Layout";
import Lightbox, { LightboxProps } from "components/Lightbox";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import client from "libs/client";
import { GetIllustrationsData } from "pages/api/illustrations";

function Gallery(): JSX.Element {
  const [photoIndex, setPhotoIndex] = useState<LightboxProps["photoIndex"]>();
  const { data } = useSWR<GetIllustrationsData>("/api/illustrations");
  const illustrations = useMemo<GalleryTopProps["illustrations"]>(
    () =>
      data?.contents.map(({ image: { url }, title }, index) => ({
        title,
        image: url,
        onClick: (): void => {
          setPhotoIndex(index);
        },
      })) || [],
    [data?.contents]
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

export type PageProps = {
  fallback: {
    "/api/illustrations": Microcms.Illustrations;
  };
};

function Page({ fallback }: PageProps): JSX.Element {
  return (
    <SWRConfig value={{ fallback }}>
      <Gallery />
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
  const illustrations = await client.get<Microcms.Illustrations>({
    endpoint: "illustrations",
    queries: {
      limit: 100,
    },
  });

  return {
    props: {
      fallback: {
        "/api/illustrations": illustrations,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Page;
