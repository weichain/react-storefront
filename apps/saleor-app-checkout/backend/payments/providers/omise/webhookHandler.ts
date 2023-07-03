import { TransactionCreateMutationVariables } from "@/saleor-app-checkout/graphql";
import { getSaleorAmountFromInteger, getTransactionAmountGetter } from "../../utils";

const OMISE_PAYMENT_PREFIX = "omise";
const CHARGE_COMPLETED = "charge.completed";
const CHARGE_CREATE = "charge.create";

export const omiseWebhookEventToTransactionCreateMutationVariables = ({
  body,
}: {
  body: any;
}): Promise<TransactionCreateMutationVariables | undefined> => {
  switch (body.key) {
    case CHARGE_COMPLETED:
    case CHARGE_CREATE:
      return checkoutSessionToTransactionCreateMutationVariables({
        chargeSession: body.data,
      });
    default:
      return body;
  }
};

export const checkoutSessionToTransactionCreateMutationVariables = async ({
  chargeSession,
}: {
  chargeSession: any;
}): Promise<any> => {
  const getAmount = getTransactionAmountGetter({
    authorized: chargeSession?.authorized_amount,
    voided: undefined,
    refunded: undefined,
    charged: chargeSession?.captured_amount,
  });
  return {
    id: chargeSession.metadata?.id,
    transaction: {
      status: chargeSession.status || "unknown",
      reference: chargeSession.id,
      type: `${OMISE_PAYMENT_PREFIX}-card`,
      amountCharged: {
        amount: getSaleorAmountFromInteger(getAmount("charged")),
        currency: chargeSession.currency,
      },
      availableActions: [],
    },
  };
};
