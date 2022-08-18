import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import axios, { AxiosResponse } from "axios";
import { Entry } from "contentful";
import { GetServerSideProps } from "next";
import basicAuthMiddleware from "nextjs-basic-auth-middleware";
import { ReactElement, useCallback, useMemo } from "react";
import TurndownService from "turndown";
import AdminAbout, { AdminAboutProps } from "components/AdminAbout";
import AdminLayout from "components/AdminLayout";
import client from "libs/client";
import { PatchAboutIdBody, PatchAboutIdData } from "pages/api/about/[id]";

export type AboutProps = {
  aboutItems: Entry<Contentful.IAboutFields>[];
};

function About({ aboutItems }: AboutProps): JSX.Element {
  const id = useMemo(() => {
    const {
      sys: { id },
    } = aboutItems[0];

    return id;
  }, [aboutItems]);
  const defaultValues = useMemo<AdminAboutProps["defaultValues"]>(() => {
    const {
      fields: { profile },
    } = aboutItems[0];
    const turndownService = new TurndownService();

    return {
      profile: turndownService.turndown(documentToHtmlString(profile)),
    };
  }, [aboutItems]);
  const handleSubmit = useCallback<AdminAboutProps["onSubmit"]>(
    async ({ profile }) => {
      const value = await richTextFromMarkdown(profile);

      await axios.patch<
        PatchAboutIdData,
        AxiosResponse<PatchAboutIdData>,
        PatchAboutIdBody
      >(`/api/about/${id}`, [
        {
          value,
          op: "replace",
          path: "/fields/profile/ja",
        },
      ]);
    },
    [id]
  );

  return <AdminAbout defaultValues={defaultValues} onSubmit={handleSubmit} />;
}

About.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<AboutProps> = async ({
  req,
  res,
}) => {
  await basicAuthMiddleware(req, res);

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
