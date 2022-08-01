import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";

export type PostEmailBody = Pick<
  Options,
  "from" | "replyTo" | "subject" | "text"
>;

export type PostEmailData = SentMessageInfo;

type ExtendedPostRequest = {
  body: PostEmailBody;
};

type ExtendedPostResponse = {
  json: (body: PostEmailData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedPostResponse>>({
  onError: (err, _, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post<ExtendedPostRequest, ExtendedPostResponse>(async ({ body }, res) => {
  const transporter = nodemailer.createTransport({
    auth: {
      pass: process.env.NODEMAILER_AUTH_PASS,
      user: process.env.NODEMAILER_AUTH_USER,
    },
    port: 465,
    secure: true,
    service: "gmail",
  });
  const { from, replyTo, subject, text } = body as PostEmailBody;
  const info = await transporter.sendMail({
    from,
    replyTo,
    subject,
    text,
    to: process.env.NODEMAILER_AUTH_USER,
  });

  res.status(200);
  res.json(info);
  res.end();
});

export default handler;
