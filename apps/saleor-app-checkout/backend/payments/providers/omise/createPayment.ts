import { ChargeRequest, ChargeResponse } from "./types";
import Omise from "../../../../../../../../omise-node";

const omise = Omise({
  publicKey: "pkey_test_5v0tzstq34vn9s6800h",
  secretKey: "skey_test_5v1asluvtklyiikdd5z",
});
// var omise = require('../../../../../../../../omise-node')({
//     'publicKey': process.env.OMISE_PUB_KEY,
//     'secretKey': process.env.OMISE_SECRET_KEY,
// });

export const createOmisePayment = async ({
  description,
  amount,
  currency,
  tokenId,
}: any): Promise<any | void> => {
  try {
    const cardDetails = {
      card: {
        name: "JOHN DOE",
        city: "Thailand",
        postal_code: 1000,
        number: "4242424242424242",
        expiration_month: 3,
        expiration_year: 2024,
        security_code: "123",
      },
    };
    const token = await omise.tokens.create(cardDetails);
    const charge = await omise.charges.create({
      description: "Charge for order ID: 888",
      amount: 100000,
      currency: "thb",
      capture: false,
      card: token.id,
    });
    return charge;
  } catch (error) {
    console.log("Charge failed with error: ", error);
  }
};
