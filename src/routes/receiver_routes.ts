import { Express, Request, Response } from "express";
import express from "express";
import { verifyWithSecret } from "../lib/hmac_verify";

export const configure = (app: Express) => {
  app.use(express.raw({ type: "*/*" }));

  app.post("/target", (req: Request, res: Response) => {
    const receiverSecret = process.env.RECEIVER_SECRET;
    if (!receiverSecret) {
      res.status(500).send("RECEIVER_SECRET not set");
      return;
    }
    const headers = req.headers;
    const requestToken = headers["X-Request-Signature"];
    if (!requestToken) {
      res.status(400).send("Missing X-Request-Signature header");
      return;
    }
    if (Array.isArray(requestToken)) {
      res.status(400).send("Malformed X-Request-Signature header");
      return;
    }
    const verified = verifyWithSecret(req.body, receiverSecret, requestToken);
    if (!verified) {
      res.status(401).send("Failed to verify request signature");
      return;
    }
  });
};
