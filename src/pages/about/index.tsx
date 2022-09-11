import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import AboutTop from "components/AboutTop";
import Layout from "components/Layout";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import client from "libs/client";

export type AboutProps = {
  about: Microcms.About;
};

function About({ about: { profile } }: AboutProps): JSX.Element {
  return (
    <>
      <Seo title="ABOUT" />
      <AboutTop about={profile} />
    </>
  );
}

About.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<AboutProps> = async () => {
  const about = await client.get<Microcms.About>({
    endpoint: "about",
  });

  return {
    props: {
      about,
    },
  };
};

export default About;
