import { allowCors } from "@/saleor-app-checkout/backend/utils";
import { NextApiHandler } from "next";

import Omise from "../../../../../../omise-node";

const omise = Omise({
  publicKey: "pkey_test_5v0tzstq34vn9s6800h",
  secretKey: "skey_test_5v1asluvtklyiikdd5z",
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const charge = await omise.charges.create({
    description: "Charge for order ID: 888",
    amount: 100000,
    currency: "thb",
    capture: false,
    card: "tokn_test_5v7q8odi4nwz1t35svm",
  });
  return res.status(200).json(charge);
};

export default allowCors(handler);
