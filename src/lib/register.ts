import {
  RegisterReceiptResponse,
  TransactionHandles,
} from "../models/protocol";

export async function register(
  clientId: string,
  clientSecret: string,
  handles: TransactionHandles,
) {
  //   let credential = format!("Basic {}:{}", client_id, client_secret);

  //   let payload = ReceiptRegistrationRequest {
  //     schema_version: "1.2.0".into(),
  //     handles,
  //     transaction_id: None,
  //   };

  //   let payload_json = serde_json::to_string(&payload).unwrap();

  //   let url = format!("{}/register", registry_url);
  //   info!("Sending registration request to: {}", url);
  //   let client = reqwest::Client::new();
  //   let response_result = client
  //     .post(url)
  //     .header("Accept", "application/json")
  //     .header("Authorization", credential)
  //     .header("Content-Type", "application/json")
  //     .body(payload_json)
  //     .send()
  //     .await;

  //   let res = match response_result {
  //     Ok(res) => res,
  //     Err(e) => {
  //       info!("Error placing request: {:?}", e);
  //       return Err(());
  //     }
  //   };
  //   info!("Registration response received");

  //   if res.status().is_success() {
  //     let data: ReceiptRegistrationResponse = match res.json().await {
  //       Ok(val) => val,
  //       Err(e) => {
  //         info!("Failed to deserialize due to error: {}", e);
  //         return Err(());
  //       }
  //     };
  //     return Ok(data);
  //   } else {
  //     info!("Received error status from registry: {}", res.status());
  //   }

  //   return Err(());
  const registryUrl = process.env.REGISTRY_URL;
  if (!registryUrl) {
    throw new Error("REGISTRY_URL must be set");
  }

  const credential = `Basic ${clientId}:${clientSecret}`;
  const payload = {
    schema_version: "1.2.0",
    handles,
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
    const data = (await response.json()) as RegisterReceiptResponse;
    return data;
  } else {
    console.error(`Received error status from registry: ${response.status}`);
    throw new Error("Failed to register");
  }
}
