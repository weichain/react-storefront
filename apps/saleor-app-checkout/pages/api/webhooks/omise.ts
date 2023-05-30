import { getSaleorApiUrlFromRequest } from "@/saleor-app-checkout/backend/auth";
import { omiseWebhookEventToTransactionCreateMutationVariables } from "@/saleor-app-checkout/backend/payments/providers/omise/webhookHandler";
import { updateOrCreateTransaction } from "@/saleor-app-checkout/backend/payments/updateOrCreateTransaction";
import { unpackThrowable } from "@/saleor-app-checkout/utils/unpackErrors";
import { NextApiHandler } from "next";

const handler: NextApiHandler<any> = async (req, res) => {
  const body = req.body;
  const [saleorApiUrlError, saleorApiUrl] = unpackThrowable(() => getSaleorApiUrlFromRequest(req));

  if (saleorApiUrlError) {
    res.status(400).json({ message: saleorApiUrlError.message });
    return;
  }

  const transactionData = await omiseWebhookEventToTransactionCreateMutationVariables({ body });
  await updateOrCreateTransaction({ saleorApiUrl, orderId: transactionData.id, transactionData });
};

export default handler;
