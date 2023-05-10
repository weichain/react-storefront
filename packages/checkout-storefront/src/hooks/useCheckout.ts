import { useEffect, useMemo } from "react";

import { Checkout, useCheckoutQuery } from "@/checkout-storefront/graphql";
import { localeToLanguageCode } from "@/checkout-storefront/lib/utils/locale";
import { useLocale } from "@/checkout-storefront/hooks/useLocale";
import { extractCheckoutIdFromUrl } from "@/checkout-storefront/lib/utils/url";
import { useCheckoutUpdateStateActions } from "@/checkout-storefront/state/updateStateStore";
import { useSaleorAuthContext } from "@/checkout-storefront/lib/auth";

export const useCheckout = ({ pause = false } = {}) => {
  const id = useMemo(() => extractCheckoutIdFromUrl(), []);
  const { locale } = useLocale();
  const { isAuthenticating } = useSaleorAuthContext();
  const { setLoadingCheckout } = useCheckoutUpdateStateActions();

  const [{ data, fetching: loading, stale }, refetch] = useCheckoutQuery({
    variables: { id, languageCode: localeToLanguageCode(locale) },
    pause: pause || isAuthenticating,
  });
  console.log(data?.checkout, "checkout data");

  // const address = {
  //   id: "123123",
  //   city: "1231312",
  //   phone: "1234557",
  //   postalCode: "123123",
  //   companyName: "aaaa",
  //   cityArea: "abc",
  //   streetAddress1: "avasd",
  //   streetAddress2: "dsdadad",
  //   countryArea: "dasdadas",
  //   firstName: "sadad",
  //   lastName: "aaaaaa",
  //   country: { code: "1000", country: "USA" },
  // };

  //data?.checkout?.billingAddress === null ? {...data, checkout.billingAddress = address} : data;

  useEffect(() => setLoadingCheckout(loading || stale), [loading, setLoadingCheckout, stale]);

  return useMemo(
    () => ({ checkout: data?.checkout as Checkout, loading: loading || stale, refetch }),
    [data?.checkout, loading, refetch, stale]
  );
};
