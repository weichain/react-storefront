import { getClientForAuthData } from "@/saleor-app-checkout/backend/saleorGraphqlClient";
import {
  OrderUpdatePaymentMetafieldMutationVariables,
  OrderUpdatePaymentPublicMetafieldDocument,
  OrderUpdatePaymentPublicMetafieldMutation,
  OrderUpdatePaymentPublicMetafieldMutationVariables,
} from "@/saleor-app-checkout/graphql";
import * as Apl from "@/saleor-app-checkout/config/apl";

export const updatePublicPaymentMetafield = async ({
  saleorApiUrl,
  orderId,
  lastDigits,
  brand,
}: {
  saleorApiUrl: string;
  orderId: OrderUpdatePaymentMetafieldMutationVariables["orderId"];
  lastDigits?: string;
  brand?: string;
}) => {
  const authData = await Apl.get(saleorApiUrl);
  const client = getClientForAuthData(authData);

  const { data, error } = await client
    .mutation<
      OrderUpdatePaymentPublicMetafieldMutation,
      OrderUpdatePaymentPublicMetafieldMutationVariables
    >(OrderUpdatePaymentPublicMetafieldDocument, {
      orderId,
      data: JSON.stringify({ lastDigits, brand }),
    })
    .toPromise();

  if (error || data?.updateMetadata?.errors) {
    return false;
  }

  return true;
};
