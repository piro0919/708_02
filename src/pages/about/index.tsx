import { Entry } from "contentful";
import { GetServerSideProps } from "next";
import { ReactElement, useMemo } from "react";
import AboutTop, { AboutTopProps } from "components/AboutTop";
import Layout from "components/Layout";
import NestedLayout from "components/NestedLayout";
import Seo from "components/Seo";
import client from "libs/client";

export type AboutProps = {
  aboutItems: Entry<Contentful.IAboutFields>[];
};

function About({ aboutItems }: AboutProps): JSX.Element {
  const about = useMemo<AboutTopProps["about"]>(() => {
    const {
      fields: { profile },
    } = aboutItems[0];

    return profile;
  }, [aboutItems]);

  return (
    <>
      <Seo title="ABOUT" />
      <AboutTop about={about} />
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
  const { items: aboutItems } =
    await client.getEntries<Contentful.IAboutFields>({
      content_type: "about" as Contentful.CONTENT_TYPE,
    });

  return {
    props: {
      aboutItems,
    },
  };
};

export default About;
