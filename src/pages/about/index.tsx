import { GetStaticProps } from "next";
import { ReactElement } from "react";
import useSWR, { SWRConfig } from "swr";
import AboutTop from "components/AboutTop";
import Layout from "components/Layout";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import client from "libs/client";
import { GetAboutData } from "pages/api/about";

function About(): JSX.Element {
  const { data } = useSWR<GetAboutData>("/api/about");

  return (
    <>
      <Seo title="ABOUT" />
      <AboutTop about={data?.profile || ""} />
    </>
  );
}

export type PageProps = {
  fallback: {
    "/api/about": Microcms.About;
  };
};

function Page({ fallback }: PageProps): JSX.Element {
  return (
    <SWRConfig value={{ fallback }}>
      <About />
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
  const about = await client.get<Microcms.About>({
    endpoint: "about",
  });

  return {
    props: {
      fallback: {
        "/api/about": about,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Page;
