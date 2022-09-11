import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import client from "libs/client";
import options from "libs/options";

type ExtendedGetRequest = Record<string, never>;

export type GetIllustrationsData = Microcms.Illustrations;

type ExtendedGetResponse = {
  json: (body: GetIllustrationsData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedGetResponse>>(
  options
).get<ExtendedGetRequest, ExtendedGetResponse>(async (_, res) => {
  const illustrations = await client.get<Microcms.Illustrations>({
    endpoint: "illustrations",
    queries: {
      limit: 100,
    },
  });

  res.status(200);
  res.json(illustrations);
  res.end();
});

export default handler;
