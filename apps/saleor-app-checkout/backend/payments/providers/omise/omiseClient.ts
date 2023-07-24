import Omise from "omise";

import { getPrivateSettings } from "@/saleor-app-checkout/backend/configuration/settings";

const saleorApiUrl = process.env.SALEOR_API_URL;

export async function omiseClient() {
  const metadata = await getPrivateSettings({ saleorApiUrl, obfuscateEncryptedData: false });

  const omise = Omise({
    publicKey: metadata.paymentProviders.omise.publicKey,
    secretKey: metadata.paymentProviders.omise.secretKey,
  });

  return omise;
}
