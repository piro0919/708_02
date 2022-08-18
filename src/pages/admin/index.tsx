import { GetServerSideProps } from "next";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import { Fragment, ReactElement } from "react";
import AdminLayout from "components/AdminLayout";

function Admin(): JSX.Element {
  return <Fragment />;
}

Admin.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await basicAuthMiddleware(req, res);

  return {
    props: {},
  };
};

export default Admin;
