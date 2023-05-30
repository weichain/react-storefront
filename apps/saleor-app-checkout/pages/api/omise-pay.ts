import { allowCors } from "@/saleor-app-checkout/backend/utils";
import { createParseAndValidateBody } from "@/saleor-app-checkout/utils";
import { NextApiHandler } from "next";
import { omiseClient } from "@/saleor-app-checkout/backend/payments/providers/omise/omiseClient";

import * as yup from "yup";

const omisePayBodySchema = yup.object({
  orderId: yup.string().required(),
  tokenId: yup.string().required(),
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
  const omise = await omiseClient();
  const [error, body] = parseAndValidateBody(req.body);

  if (error) {
    console.error(error, req.body);
    res.status(400).send({ ok: false, error: "Invalid JSON" });
    return;
  }
  const { orderId, amountCharged, tokenId } = body;

  const charge = await omise.charges.create({
    amount: amountCharged.amount,
    currency: amountCharged.currency,
    card: tokenId,
    metadata: {
      id: orderId,
    },
  });

  res.status(200).json(charge);
};

export default allowCors(handler);
