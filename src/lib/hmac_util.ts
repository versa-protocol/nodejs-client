import crypto from "crypto";

export function generateToken(body: Buffer, secret: string) {
  const hmac = crypto.createHmac("sha1", secret);

  hmac.update(body);

  const codeBytes = hmac.digest();
  const encoded = codeBytes.toString("base64");

  return encoded;
}
