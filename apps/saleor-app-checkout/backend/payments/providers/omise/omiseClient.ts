import { getPrivateSettings } from "@/saleor-app-checkout/backend/configuration/settings";
import Omise from "omise";

const saleorApiUrl = "https://www.gateway.opn.network/primary-market-dev/graphql/";
const metadata = await getPrivateSettings({ saleorApiUrl, obfuscateEncryptedData: false });
console.log("metadata is: ", metadata);

const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export async function omiseClient() {
  return omise;
}
