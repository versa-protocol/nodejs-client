import crypto from "crypto";

export function verifyWithSecret(body: Buffer, secret: string, token: string) {
  const hmac = crypto.createHmac("sha1", secret);

  hmac.update(body);

  const codeBytes = hmac.digest();
  const encoded = codeBytes.toString("base64");

  return encoded === token;
}
