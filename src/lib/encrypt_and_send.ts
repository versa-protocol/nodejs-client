import { Receiver, ReceiverPayload, WebhookEvent } from "../models/protocol";
import { encrypt } from "./encrypt";
import { generateToken } from "./hmac_util";

export async function encryptAndSend(
  receiver: Receiver,
  sender_client_id: string,
  receipt_id: string,
  key: string,
  receipt: any,
) {
  let receiptString = JSON.stringify(receipt);
  console.log(`Sending encrypted receipt to ${receiver.address}`);

  const envelope = encrypt(
    Buffer.from(receiptString),
    Buffer.from(key, "base64"),
  );

  const event: WebhookEvent<ReceiverPayload> = {
    event: "receipt",
    data: {
      sender_client_id,
      receipt_id,
      envelope,
    },
  };

  const payloadJson = JSON.stringify(event);

  const hmacToken = generateToken(Buffer.from(payloadJson), receiver.secret);

  return await fetch(receiver.address, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Signature": hmacToken,
    },
    body: payloadJson,
  });
}
