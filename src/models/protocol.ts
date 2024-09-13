// Todo: move to an SDK?
export interface Envelope {
  encrypted: string;
  nonce: string;
}

export interface TransactionHandles {
  customer_email?: string;
  customer_email_domain?: string;
  card_bin?: string;
  card_last_four?: string;
  versa_client_ids?: string[];
}

export interface Receiver {
  org_id: string;
  secret: string;
  address: string;
}

export interface ReceiverPayload {
  sender_client_id: string;
  receipt_id: string;
  envelope: Envelope;
}

export interface RegisterReceiptResponse {
  receipt_id: string;
  encryption_key: string;
  receivers: Receiver[];
}

export interface CheckoutRequest {
  receipt_id: string;
}

export interface Address {
  street_address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  tz: string;
}

export interface Sender {
  address: Address;
  brand_color: string;
  logo: string;
  name: string;
  vat_number: string;
  website: string;
}

export interface Checkout {
  key: string;
  receipt_id: string;
  receipt_hash: string;
  schema_version: string;
  transaction_id: string;
  sender: Sender;
  handles: TransactionHandles;
}
