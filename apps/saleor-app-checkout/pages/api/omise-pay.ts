import { allowCors } from "@/saleor-app-checkout/backend/utils";
import { createParseAndValidateBody } from "@/saleor-app-checkout/utils";
import { NextApiHandler } from "next";
import * as yup from "yup";

import Omise from "omise";
const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const omisePayBodySchema = yup.object({
  orderId: yup.string().required(),
  cardDetails: yup.object({
    card: yup.object({
      name: yup.string().required(),
      city: yup.string().required(),
      postal_code: yup.number().required(),
      number: yup.string().required(),
      expiration_month: yup.number().required(),
      expiration_year: yup.number().required(),
      security_code: yup.string().required(),
    }),
  }),
  amountCharged: yup.object({
    amount: yup.number().required(),
    currency: yup.string().required(),
  }),
});

const parseAndValidateBody = createParseAndValidateBody(omisePayBodySchema);

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const [error, body] = parseAndValidateBody(req.body);

  if (error) {
    console.error(error, req.body);
    res.status(400).send({ ok: false, error: "Invalid JSON" });
    return;
  }
  const { orderId, amountCharged, cardDetails } = body;

  const token = await omise.tokens.create(cardDetails);
  const charge = await omise.charges.create({
    amount: amountCharged.amount,
    currency: amountCharged.currency,
    card: token.id,
    metadata: {
      id: orderId,
    },
  });

  res.status(200).json(charge);
};

export default allowCors(handler);
