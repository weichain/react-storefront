import {
  CustomizationSettingsValues,
  PaymentProviderSettingsValues,
  PrivateSettingsValues,
  PublicSettingsValues,
} from "types/api";
import { ChannelActivePaymentProvidersByChannel } from "checkout-common";

export const defaultActiveChannelPaymentProviders: ChannelActivePaymentProvidersByChannel = {
  applePay: "",
  creditCard: "omise",
  paypal: "",
  dropin: "",
  dummy: "",
};

export const defaultPaymentProviderSettings: PaymentProviderSettingsValues<"unencrypted"> = {
  mollie: {
    apiKey: "",
    profileId: "",
  },
  adyen: {
    merchantAccount: "",
    clientKey: "",
    apiKey: "",
    hmac: "",
    password: "",
    username: "",
  },
  stripe: {
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
  },
  omise: {
    publicKey: "pkey_test_5v0tzstq34vn9s6800h",
    secretKey: "skey_test_5v1asluvtklyiikdd5z",
  },
  dummy: {
    dummyKey: "",
  },
};

export const defaultCustomizationSettings: CustomizationSettingsValues = {
  branding: {
    buttonBgColorPrimary: "#394052",
    buttonBgColorHover: "#FAFAFA",
    borderColorPrimary: "#394052",
    errorColor: "#B65757",
    successColor: "#2C9B2A",
    buttonTextColor: "#ffffff",
    textColor: "#000000",
    logoUrl: "",
  },
  productSettings: {
    lowStockThreshold: "",
  },
};

export const defaultPublicSettings: PublicSettingsValues = {
  customizations: defaultCustomizationSettings,
  channelActivePaymentProviders: {},
};
export const defaultPrivateSettings: PrivateSettingsValues<"unencrypted"> = {
  paymentProviders: defaultPaymentProviderSettings,
};
