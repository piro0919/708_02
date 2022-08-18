import { Entry, EntryProps, KeyValueMap } from "contentful-management";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getEnvironment from "libs/getEnvironment";
import options from "libs/options";

export type PostillustrationsBody = Omit<EntryProps<KeyValueMap>, "sys">;

export type PostillustrationsData = Entry;

type ExtendedPostRequest = {
  body: PostillustrationsBody;
};

type ExtendedPostResponse = {
  json: (body: PostillustrationsData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedPostResponse>>(
  options
).post<ExtendedPostRequest, ExtendedPostResponse>(async ({ body }, res) => {
  const environment = await getEnvironment();
  const entry = await environment
    .createEntry("illustrations" as Contentful.CONTENT_TYPE, body)
    .then((entry) => entry.publish());

  res.status(200);
  res.json(entry);
  res.end();
});

export default handler;
