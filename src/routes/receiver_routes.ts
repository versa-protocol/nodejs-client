import { Express, Request, Response } from "express";
import express from "express";
import { verifyWithSecret } from "../lib/hmac_verify";
import { ReceiverPayload } from "../models/protocol";
import { checkout } from "../lib/checkout";
import { decrypt } from "../lib/decrypt";

export const configure = (app: Express) => {
  app.use(express.raw({ type: "*/*" }));

  app.post("/target", async (req: Request, res: Response) => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const receiverSecret = process.env.RECEIVER_SECRET;
    if (!receiverSecret) {
      res.status(500).send("RECEIVER_SECRET not set");
      return;
    }
    const headers = req.headers;
    const requestToken = headers["x-request-signature"];
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

    console.log(req.body.toString());
    const receiverPayload = JSON.parse(req.body.toString()) as ReceiverPayload;

    const checkoutResponse = await checkout(
      client_id,
      client_secret,
      receiverPayload.receipt_id,
    );

    const key = checkoutResponse.key;

    const decrypted = decrypt(receiverPayload.envelope, key);

    const payload = {
      sender_client_id: receiverPayload.sender_client_id,
      receipt_id: checkoutResponse.receipt_id,
      transaction_id: checkoutResponse.transaction_id,
      receiver_client_id: client_id,
      handles: checkoutResponse.handles,
      sender: checkoutResponse.sender,
      receipt: decrypted,
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // TODO: Logic to handle the decrypted payload, whether storing or forwarding it to another service
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    console.log("Successfully received data over the Versa network: ", payload);
  });
};
