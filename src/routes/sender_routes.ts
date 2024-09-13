import { Express, Request, Response } from "express";
import { TransactionHandles } from "../models/protocol";
import { register } from "../lib/register";

interface SendRequestPayload {
  receipt: any;
  schema_version: string;
  handles: TransactionHandles;
}

async function send(payload: SendRequestPayload): Promise<void> {
  // 1. Register with Versa registry
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  if (!client_id || !client_secret) {
    throw new Error("CLIENT_ID and CLIENT_SECRET must be set");
  }

  if (!payload.receipt) {
    throw new Error("A receipt must be provided to the sending target");
  }

  const registrationResponse = await register(
    client_id,
    client_secret,
    payload.handles,
  );
  console.log(
    `Registration successful, received ${registrationResponse.receivers.length} receivers`,
  );

  // 2 and 3. Encrypt and send to each receiver
  for (const receiver of registrationResponse.receivers) {
    console.log(
      `Encrypting and sending envelope to receiver ${receiver.org_id} at ${receiver.address}`,
    );
    try {
      // await encryptAndSend(receiver, client_id, registrationResponse.receipt_id, registrationResponse.encryption_key, payload.receipt);
      console.log(`Successfully sent to receiver: ${receiver.address}`);
    } catch (e) {
      console.error(`Failed to send to receiver: ${e}`);
    }
  }
}

export const configure = (app: Express) => {
  app.post("/send", (req: Request, res: Response) => {
    const payload: SendRequestPayload = req.body;
    console.log(payload);
    send(payload)
      .then(() => {
        res.status(200).send("OK");
      })
      .catch((e) => {
        res.status(500).send;
      });
  });
};
