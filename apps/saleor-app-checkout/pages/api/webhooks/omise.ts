import * as Sentry from "@sentry/nextjs";

import { getSaleorApiUrlFromRequest } from "@/saleor-app-checkout/backend/auth";
import { omiseWebhookEventToTransactionCreateMutationVariables } from "@/saleor-app-checkout/backend/payments/providers/omise/webhookHandler";
import { updateOrCreateTransaction } from "@/saleor-app-checkout/backend/payments/updateOrCreateTransaction";
import { unpackPromise, unpackThrowable } from "@/saleor-app-checkout/utils/unpackErrors";
import { NextApiHandler } from "next";
import { MissingPaymentProviderSettingsError } from "@/saleor-app-checkout/backend/payments/errors";

const handler: NextApiHandler = async (req, res) => {
  const body = req.body;
  const [saleorApiUrlError, saleorApiUrl] = unpackThrowable(() => getSaleorApiUrlFromRequest(req));

  if (saleorApiUrlError) {
    res.status(400).json({ message: saleorApiUrlError.message });
    return;
  }

  const [paymentError, paymentData] = await unpackPromise(
    omiseWebhookEventToTransactionCreateMutationVariables({ body })
  );

  if (paymentError) {
    console.error(paymentError);

    if (paymentError instanceof MissingPaymentProviderSettingsError) {
      res.status(500).json({ error: paymentError.message });
      return;
    }

    Sentry.captureException(paymentError);
    res.status(500).json({ error: "error while validating payment" });
    return;
  }
  if (paymentData) {
    await updateOrCreateTransaction({
      saleorApiUrl,
      orderId: paymentData.id,
      transactionData: paymentData,
    });

    res.status(200).send("ok");

    return;
  }
};

export default handler;
