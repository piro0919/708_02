import axios from "axios";
import { AssetCollection } from "contentful";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import noScroll from "no-scroll";
import { ReactElement, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import AdminAssets, { AdminAssetsProps } from "components/AdminAssets";
import AdminLayout from "components/AdminLayout";
import NewAssetPortal, { NewAssetPortalProps } from "components/NewAssetPortal";
import client from "libs/client";

export type AssetsProps = {
  assetCollection: AssetCollection;
};

function Assets({ assetCollection: { items } }: AssetsProps): JSX.Element {
  const assets = useMemo<AdminAssetsProps["assets"]>(
    () =>
      items.map(
        ({
          fields: {
            description,
            file: { url },
            title,
          },
        }) => ({
          description,
          title,
          image: url,
        })
      ),
    [items]
  );
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean();
  const [images, setImages] = useState<NewAssetPortalProps["value"]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [isOpen]);

  useEffect(() => {
    if (!images.length) {
      return;
    }

    const { dataURL } = images[0];

    if (!dataURL) {
      return;
    }

    toast.loading("追加中です…");

    axios
      .post("/api/asset", {
        base64string: dataURL.split(";base64,")[1],
        expiration: 60,
      })
      .then(() => {
        router.reload();
      });
  }, [images, offIsOpen, router]);

  return (
    <>
      <AdminAssets assets={assets} onClick={onIsOpen} />
      {isOpen ? (
        <NewAssetPortal
          onChange={setImages}
          onClose={offIsOpen}
          value={images}
        />
      ) : null}
    </>
  );
}

Assets.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<AssetsProps> = async ({
  req,
  res,
}) => {
  await basicAuthMiddleware(req, res);

  const assetCollection = await client.getAssets();

  return {
    props: {
      assetCollection,
    },
  };
};

export default Assets;
