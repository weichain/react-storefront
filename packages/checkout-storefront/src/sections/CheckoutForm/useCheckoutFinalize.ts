import Omise from "omise";

import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";

import { usePay } from "@/checkout-storefront/hooks/usePay";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelectedPaymentData } from "@/checkout-storefront/state/paymentDataStore";

import {
  PublicMetafieldsInferedDocument,
  PublicMetafieldsInferedQuery,
  PublicMetafieldsInferedQueryVariables,
} from "@/checkout-storefront/graphql";
import { useUrqlClient } from "@/checkout-storefront/lib/auth";
import jsonFile from "../../../../../apps/saleor-app-checkout/.saleor-app-auth.json";

export interface ICard {
  cvc: string;
  expiry: string;
  name: string;
  number: string;
}

export const useCheckoutFinalize = () => {
  const { checkout } = useCheckout();
  const { checkoutPay, loading, error: payError, data: _payData } = usePay();
  const { paymentMethod, paymentProvider } = useSelectedPaymentData();
  const router = useRouter();
  const saleorApiUrl = router.query.saleorApiUrl as string;
  const { urqlClient, resetClient } = useUrqlClient({
    url: saleorApiUrl,
    requestPolicy: "network-only",
    suspense: false,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${jsonFile.token}`,
      },
    },
  });

  useEffect(() => {
    // @todo should this show a notification?
    if (payError) {
      console.error(payError);
    }
  }, [payError]);

  const checkoutFinalize = useCallback(
    async (card: ICard) => {
      if (!paymentMethod || !paymentProvider) {
        return;
      }
      const { data, error } = await urqlClient
        .query<PublicMetafieldsInferedQuery, PublicMetafieldsInferedQueryVariables>(
          PublicMetafieldsInferedDocument,
          { keys: ["publicKeys"] }
        )
        .toPromise();

      const cardDetails = {
        number: card.number,
        name: card.name,
        expiration_month: Number(card.expiry.substring(0, 2)),
        expiration_year: Number(card.expiry.substring(3, 5)),
        security_code: card.cvc,
        city: "",
        postal_code: "",
      };

      let token: Omise.Tokens.IToken;
      try {
        const omisePubKey = JSON.parse(data?.app?.metafields?.publicKeys as string).omise.publicKey;
        const omise = Omise({
          publicKey: omisePubKey,
        });
        token = await omise.tokens.create({ card: cardDetails });
      } catch (e: any) {
        window.postMessage({
          source: "react-devtools-content-script",
          payload: { event: "setTraceUpdatesEnabled", payload: false },
          message: "network_error",
        });
        console.error("Unable to create token, reason: ", e.message);
        return;
      }
      const result = await checkoutPay({
        provider: paymentProvider,
        method: paymentMethod,
        checkoutId: checkout?.id,
        totalAmount: checkout?.totalPrice?.gross?.amount,
        tokenId: token.id,
      });

      if (!result) {
        console.error("Unexpected empty result!", { result });
        return;
      }

      if ("ok" in result && result.ok === false) {
        // for now api doesn't return errors in some cases
        // const { errors } = result;
        // const parsedErrors = errors.map((error) => ({
        //   code: error,
        // }));
        // showCustomErrors(parsedErrors, "checkoutPay");
      }
    },
    [checkout?.id, checkout?.totalPrice?.gross?.amount, checkoutPay, paymentMethod, paymentProvider]
  );

  return {
    checkoutFinalize,
    finalizing: loading,
  };
};
