import { omisePay } from "@/saleor-app-checkout/../../packages/checkout-storefront/src/fetch";
import { CreatePaymentData, CreatePaymentResult } from "../../types";
import { omiseClient } from "./omiseClient";

export const createOmisePayment = async ({
  saleorApiUrl,
  order,
  redirectUrl,
  appUrl,
  cardDetails,
}: CreatePaymentData): Promise<CreatePaymentResult> => {
  const token = await createPaymentToken({ cardDetails });
  const response = await omisePay({
    checkoutApiUrl: process.env.CHECKOUT_APP_URL as string,
    saleorApiUrl,
    tokenId: token.id,
    orderId: order.id,
    amountCharged: { amount: "20000", currency: "thb" },
  });
  const result = await response.json();
  return {
    url: `/default-channel/EN/order/${order.id}`,
    lastDigits: result.card.last_digits,
    brand: result.card.brand,
    id: result.metadata.id,
  };
};

const createPaymentToken = async ({ cardDetails }: any) => {
  const omise = await omiseClient();
  return omise.tokens.create({ card: cardDetails });
};
