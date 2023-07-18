/* eslint-disable import/no-restricted-paths */
import { omisePay } from "@/saleor-app-checkout/../../packages/checkout-storefront/src/fetch";
import { CreatePaymentData, CreatePaymentResult } from "../../types";
import { getIntegerAmountFromSaleor } from "../../utils";
import { omiseClient } from "./omiseClient";

export const createOmisePayment = async (
  { saleorApiUrl, order, redirectUrl, appUrl, tokenId }: CreatePaymentData,
  channelAndLocale: string
): Promise<CreatePaymentResult> => {
  console.log(redirectUrl, appUrl);
  console.log("token is: ", tokenId);
  console.log("saleorApiUrl: ", saleorApiUrl);
  console.log("orderID: ", order.id);
  console.log("process.env.CHECKOUT_APP_URL: ", process.env.CHECKOUT_APP_URL);
  const response = await omisePay({
    checkoutApiUrl: process.env.CHECKOUT_APP_URL,
    saleorApiUrl,
    tokenId: tokenId!,
    orderId: order.id,
    amountCharged: {
      amount: getIntegerAmountFromSaleor(order.total.gross.amount),
      currency: order.total.gross.currency,
    },
  });
  console.log("the response is: ", response);
  const result = await response.json();
  console.log("the result is: ", result);
  return {
    url: `/${channelAndLocale}/order/${order.id}`,
    lastDigits: result.card.last_digits,
    brand: result.card.brand,
    id: result.metadata.id,
  };
};

// export const createPaymentToken = async ({ cardDetails }: any) => {
//   const omise = await omiseClient();
//   return omise.tokens.create({ card: cardDetails });
// };
