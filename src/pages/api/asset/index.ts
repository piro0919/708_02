/ eslint-disable camelcase /;
import { Asset } from "contentful-management";
import imgbbUploader from "imgbb-uploader";
import {
  IOptionObject,
  IResponseObject,
} from "imgbb-uploader/lib/cjs/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getEnvironment from "libs/getEnvironment";
import options from "libs/options";

export type PostAssetBody = Omit<IOptionObject, "apiKey">;

export type PostAssetData = Asset;

type ExtendedPostRequest = {
  body: PostAssetBody;
};

type ExtendedPostResponse = {
  json: (body: PostAssetData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedPostResponse>>(
  options
).post<ExtendedPostRequest, ExtendedPostResponse>(async ({ body }, res) => {
  const response = await imgbbUploader({
    ...(body as PostAssetBody),
    apiKey: process.env.IMGBB_API_KEY || "",
  });
  const {
    image: { filename, mime, url },
  } = response as IResponseObject;
  const environment = await getEnvironment();
  const asset = await environment
    .createAsset({
      fields: {
        description: {
          ja: "",
        },
        file: {
          ja: {
            contentType: mime,
            fileName: filename,
            upload: url,
          },
        },
        title: {
          ja: "",
        },
      },
    })
    .then((asset) => asset.processForLocale("ja"))
    .then((asset) => asset.publish());

  res.status(200);
  res.json(asset);
  res.end();
});

export default handler;
