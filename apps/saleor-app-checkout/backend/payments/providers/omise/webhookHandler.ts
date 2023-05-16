const OMISE_PAYMENT_PREFIX = "omise";
const CHARGE_COMPLETED = "charge.completed";
const CHARGE_CREATE = "charge.create";

export const omiseWebhookEventToTransactionCreateMutationVariables = ({ body }: { body: any }) => {
  switch (body.key) {
    case CHARGE_COMPLETED:
    case CHARGE_CREATE:
      return checkoutSessionToTransactionCreateMutationVariables({
        chargeSession: body.data,
      });
    default:
      return null;
  }
};

export const checkoutSessionToTransactionCreateMutationVariables = async ({
  chargeSession,
}: {
  chargeSession: any;
}): Promise<any> => {
  return {
    id: chargeSession.metadata?.id,
    transaction: {
      status: chargeSession.status || "unknown",
      reference: chargeSession.id,
      type: `${OMISE_PAYMENT_PREFIX}-'card'`,
      availableActions: [],
    },
  };
};
