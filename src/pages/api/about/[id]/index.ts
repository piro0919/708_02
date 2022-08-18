import { Entry } from "contentful-management";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getEnvironment from "libs/getEnvironment";
import options from "libs/options";

export type PatchAboutIdBody = jsonpatch.OpPatch[];

export type PatchAboutIdData = Entry;

type ExtendedPatchRequest = {
  body: PatchAboutIdBody;
};

type ExtendedPatchResponse = {
  json: (body: PatchAboutIdData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedPatchResponse>>(
  options
).patch<ExtendedPatchRequest, ExtendedPatchResponse>(
  async ({ body, query: { id } }, res) => {
    if (typeof id !== "string") {
      res.status(404);
      res.end();

      return;
    }

    const environment = await getEnvironment();
    const entry = await environment
      .getEntry(id)
      .then((entry) => entry.patch(body))
      .then((entry) => entry.publish());

    res.status(200);
    res.json(entry);
    res.end();
  }
);

export default handler;
