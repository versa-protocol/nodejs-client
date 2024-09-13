// Todo: move to an SDK?
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

export interface RegisterReceiptResponse {
  receipt_id: string;
  encryption_key: string;
  receivers: Receiver[];
}
