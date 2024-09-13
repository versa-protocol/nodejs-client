import { Checkout, CheckoutRequest } from "../models/protocol";

export async function checkout(
  clientId: string,
  clientSecret: string,
  receipt_id: string,
) {
  const registryUrl = process.env.REGISTRY_URL;
  if (!registryUrl) {
    throw new Error("REGISTRY_URL must be set");
  }

  const credential = `Basic ${clientId}:${clientSecret}`;
  const payload: CheckoutRequest = {
    receipt_id,
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
    const data = (await response.json()) as Checkout;
    return data;
  } else {
    console.error(`Received error status from registry: ${response.status}`);
    throw new Error("Failed to register");
  }
}
