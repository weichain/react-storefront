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
  const { amount, currency, token: card } = req.body;
  const charge = await omise.charges.create({
    amount,
    currency,
    card,
  });

  res.status(200).json(charge);
};

export default handler;
