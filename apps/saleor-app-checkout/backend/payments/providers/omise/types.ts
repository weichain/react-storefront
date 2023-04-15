export interface ChargeRequest {
  description: string;
  amount: number;
  currency: string;
  tokenId: string;
}

export interface ChargeResponse {
  status: string;
  chargedAt?: string;
}
