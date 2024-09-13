import { siv } from "@noble/ciphers/aes";
import { Envelope } from "../models/protocol";

export function decrypt(envelope: Envelope, key: string): string {
  const bytekey = Buffer.from(key, "base64");

  if (bytekey.length !== 32) {
    throw new Error("Key must be 32 bytes (256 bits) for AES-GCM-SIV");
  }

  const iv = Buffer.from(envelope.nonce, "base64");

  const stream = siv(bytekey, iv);

  const decrypted = stream.decrypt(Buffer.from(envelope.encrypted, "base64"));

  return new TextDecoder("utf-8").decode(decrypted);
}
