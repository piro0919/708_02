import axios, { AxiosResponse } from "axios";
import { AssetCollection, Entry } from "contentful";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import noScroll from "no-scroll";
import { ReactElement, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import AdminGallery, { AdminGalleryProps } from "components/AdminGallery";
import AdminLayout from "components/AdminLayout";
import NewGalleryPortal, {
  NewGalleryPortalProps,
} from "components/NewGalleryPortal";
import client from "libs/client";
import {
  PostillustrationsData,
  PostillustrationsBody,
} from "pages/api/illustrations";

export type GalleryProps = {
  assetCollection: AssetCollection;
  illustrationItems: Entry<Contentful.IIllustrationsFields>[];
};

function Gallery({
  assetCollection,
  illustrationItems,
}: GalleryProps): JSX.Element {
  const illustrations = useMemo<AdminGalleryProps["illustrations"]>(
    () =>
      illustrationItems.map(
        ({
          fields: {
            image: {
              fields: {
                file: { url },
              },
            },
            title,
          },
        }) => ({
          title,
          image: url,
        })
      ),
    [illustrationItems]
  );
  const router = useRouter();
  const assets = useMemo<NewGalleryPortalProps["assets"]>(
    () =>
      assetCollection.items
        .map(
          ({
            fields: {
              file: { url },
            },
            sys: { id },
          }) => ({
            url,
            onClick: async (): Promise<void> => {
              toast.loading("追加中です…");

              await axios.post<
                PostillustrationsData,
                AxiosResponse<PostillustrationsData>,
                PostillustrationsBody
              >("/api/illustrations", {
                fields: {
                  image: {
                    ja: {
                      sys: {
                        id,
                        linkType: "Asset",
                        type: "Link",
                      },
                    },
                  },
                  title: {
                    ja: "",
                  },
                },
              });

              router.reload();
            },
          })
        )
        .filter(({ url }) => !illustrations.some(({ image }) => url === image)),
    [assetCollection.items, illustrations, router]
  );
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean();

  useEffect(() => {
    if (isOpen) {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [isOpen]);

  return (
    <>
      <AdminGallery illustrations={illustrations} onOpen={onIsOpen} />
      {isOpen ? <NewGalleryPortal assets={assets} onClose={offIsOpen} /> : null}
    </>
  );
}

Gallery.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<GalleryProps> = async ({
  req,
  res,
}) => {
  await basicAuthMiddleware(req, res);

  const [{ items: illustrationItems }, assetCollection] = await Promise.all([
    client.getEntries<Contentful.IIllustrationsFields>({
      content_type: "illustrations" as Contentful.CONTENT_TYPE,
    }),
    client.getAssets(),
  ]);

  return {
    props: {
      assetCollection,
      illustrationItems,
    },
  };
};

export default Gallery;
