import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import client from "libs/client";
import options from "libs/options";

type ExtendedGetRequest = Record<string, never>;

export type GetAboutData = Microcms.About;

type ExtendedGetResponse = {
  json: (body: GetAboutData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedGetResponse>>(
  options
).get<ExtendedGetRequest, ExtendedGetResponse>(async (_, res) => {
  const about = await client.get<Microcms.About>({
    endpoint: "about",
    queries: {
      limit: 100,
    },
  });

  res.status(200);
  res.json(about);
  res.end();
});

export default handler;
