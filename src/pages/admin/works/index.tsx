import { AssetCollection, Entry } from "contentful";
import { GetServerSideProps } from "next";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import { ReactElement } from "react";
import AdminLayout from "components/AdminLayout";
import client from "libs/client";

export type WorksProps = {
  assetCollection: AssetCollection;
  workItems: Entry<Contentful.IWorksFields>[];
};

function Works({ workItems }: WorksProps): JSX.Element {
  console.log(workItems);

  return <div>aaa</div>;
}

Works.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<WorksProps> = async ({
  req,
  res,
}) => {
  await basicAuthMiddleware(req, res);

  const [{ items: workItems }, assetCollection] = await Promise.all([
    client.getEntries<Contentful.IWorksFields>({
      content_type: "works" as Contentful.CONTENT_TYPE,
    }),
    client.getAssets(),
  ]);

  return {
    props: {
      assetCollection,
      workItems,
    },
  };
};

export default Works;
