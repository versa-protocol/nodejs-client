import { siv } from "@noble/ciphers/aes";
import { randomBytes } from "@noble/ciphers/webcrypto";
import { Envelope } from "../models/protocol";

export function encrypt(plaintext: Uint8Array, key: Uint8Array): Envelope {
  if (key.length !== 32) {
    throw new Error("Key must be 32 bytes (256 bits) for AES-GCM-SIV");
  }

  const iv = randomBytes(12);

  const stream = siv(key, iv);

  const ciphertext = stream.encrypt(plaintext);

  const encrypted = Buffer.from(ciphertext).toString("base64");
  const nonce = Buffer.from(iv).toString("base64");
  return { encrypted, nonce };
}
