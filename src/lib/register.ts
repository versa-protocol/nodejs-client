import {
  ReceiptRegistrationRequest,
  ReceiptRegistrationResponse,
  TransactionHandles,
} from "../models/protocol";

export async function register(
  clientId: string,
  clientSecret: string,
  handles: TransactionHandles,
  transaction_id: string | null,
) {
  const registryUrl = process.env.REGISTRY_URL;
  if (!registryUrl) {
    throw new Error("REGISTRY_URL must be set");
  }

  const credential = `Basic ${clientId}:${clientSecret}`;
  const payload: ReceiptRegistrationRequest = {
    schema_version: "1.2.0",
    handles,
    transaction_id,
  };
  const payloadJson = JSON.stringify(payload);
  const url = `${registryUrl}/register`;
  console.log(`Sending registration request to: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: credential,
      "Content-Type": "application/json",
    },
    body: payloadJson,
  });

  console.log("Registration response received");
  if (response.ok) {
    const data = (await response.json()) as ReceiptRegistrationResponse;
    return data;
  } else {
    console.error(`Received error status from registry: ${response.status}`);
    throw new Error("Failed to register");
  }
}
