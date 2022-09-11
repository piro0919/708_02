import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import client from "libs/client";
import options from "libs/options";

type ExtendedGetRequest = Record<string, never>;

export type GetWorksData = Microcms.Works;

type ExtendedGetResponse = {
  json: (body: GetWorksData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedGetResponse>>(
  options
).get<ExtendedGetRequest, ExtendedGetResponse>(async (_, res) => {
  const works = await client.get<Microcms.Works>({
    endpoint: "works",
    queries: {
      limit: 100,
    },
  });

  res.status(200);
  res.json(works);
  res.end();
});

export default handler;
