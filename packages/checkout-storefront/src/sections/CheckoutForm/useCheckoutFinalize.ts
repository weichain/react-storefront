import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";

import { usePay } from "@/checkout-storefront/hooks/usePay";
import { useCallback, useEffect } from "react";
import { useSelectedPaymentData } from "@/checkout-storefront/state/paymentDataStore";

import Omise from "omise";

const omise = Omise({
  publicKey: "",
  secretKey: "",
});

export const useCheckoutFinalize = () => {
  const { checkout } = useCheckout();
  const { checkoutPay, loading, error: payError, data: _payData } = usePay();
  const { paymentMethod, paymentProvider } = useSelectedPaymentData();

  useEffect(() => {
    // @todo should this show a notification?
    if (payError) {
      console.error(payError);
    }
  }, [payError]);

  const checkoutFinalize = useCallback(
    async (card: any) => {
      if (!paymentMethod || !paymentProvider) {
        return;
      }
      const cardDetails = {
        number: card.number,
        name: card.name,
        expiration_month: +card.expiry.split("/")[0],
        expiration_year: +card.expiry.split("/")[1],
        security_code: card.security_code,
        city: "",
        postal_code: "",
      };
      let token: Omise.Tokens.IToken;
      try {
        token = await omise.tokens.create({ card: cardDetails });
      } catch (e: any) {
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
