/* eslint-disable import/no-restricted-paths */
import { omisePay } from "@/saleor-app-checkout/../../packages/checkout-storefront/src/fetch";
import { CreatePaymentData, CreatePaymentResult } from "../../types";
import { getIntegerAmountFromSaleor } from "../../utils";
import { omiseClient } from "./omiseClient";

export const createOmisePayment = async (
  { saleorApiUrl, order, redirectUrl, appUrl, cardDetails }: CreatePaymentData,
  channelAndLocale: string
): Promise<CreatePaymentResult> => {
  console.log(redirectUrl, appUrl);
  const token = await createPaymentToken({ cardDetails });
  const response = await omisePay({
    checkoutApiUrl: process.env.CHECKOUT_APP_URL as string,
    saleorApiUrl,
    tokenId: token.id,
    orderId: order.id,
    amountCharged: {
      amount: getIntegerAmountFromSaleor(order.total.gross.amount),
      currency: order.total.gross.currency,
    },
  });
  const result = await response.json();
  return {
    url: `/${channelAndLocale}/order/${order.id}`,
    lastDigits: result.card.last_digits,
    brand: result.card.brand,
    id: result.metadata.id,
  };
};

const createPaymentToken = async ({ cardDetails }: any) => {
  const omise = await omiseClient();
  return omise.tokens.create({ card: cardDetails });
};
