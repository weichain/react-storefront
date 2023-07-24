import type { PaymentMethodID, PaymentProviderID } from "./payments";

type BaseBody = {
  provider: PaymentProviderID;
  method: PaymentMethodID;
  redirectUrl: string;
  tokenId?: string;
  // captureAmount?: number; // support for partial payments
};

export type OrderBody = {
  orderId: string;
} & BaseBody;

export type CheckoutBody = {
  checkoutId: string;
  totalAmount: number;
} & BaseBody;

export type PayRequestBody = OrderBody | CheckoutBody;

export type PaymentStatusResponse = {
  status: "PAID" | "PENDING" | "UNPAID";
  sessionLink?: string;
};

export type ChannelActivePaymentProvidersByChannel = {
  [P in PaymentMethodID]: PaymentProviderID | "";
};

export type DummyPayRequestBody = {
  checkoutApiUrl: string;
  saleorApiUrl: string;
  amountCharged: {
    amount: number;
    currency: string;
  };
} & Pick<OrderBody, "orderId">;

export type DummyPayRequestResult =
  | {
      ok: true;
    }
  | { ok: false; error: string };

export type OmisePayRequestBody = {
  checkoutApiUrl: string;
  saleorApiUrl: string;
  orderId: string;
  tokenId: string;
  amountCharged: {
    amount: number;
    currency: string;
  };
} & Pick<OrderBody, "orderId">;

export type OmisePayRequestResult =
  | {
      ok: true;
    }
  | { ok: false; error: string };

export type CreditCardDetails = {
  number: string;
  name: string;
  expiration_month: number;
  expiration_year: number;
  security_code: string;
};
