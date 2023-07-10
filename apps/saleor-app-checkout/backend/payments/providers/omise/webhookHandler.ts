import { TransactionCreateMutationVariables } from "@/saleor-app-checkout/graphql";
import { getSaleorAmountFromInteger, getTransactionAmountGetter } from "../../utils";

const OMISE_PAYMENT_PREFIX = "omise";

enum OmiseStatuses {
  Failed = "failed",
  Expired = "expired",
  Pending = "pending",
  Reversed = "reversed",
  Successful = "successful",
}

export const createOmisePayment = async ({
  body,
}: {
  body: any;
}): Promise<TransactionCreateMutationVariables | undefined> => {
  const {
    key: eventType,
    data: { status, metadata, id, authorized_amount, captured_amount, currency },
  } = body;

  const getAmount = getTransactionAmountGetter({
    authorized: authorized_amount,
    voided: undefined,
    refunded: undefined,
    charged: captured_amount,
  });

  if (status === OmiseStatuses.Pending) {
    return {
      id: metadata.id,
      transaction: {
        status,
        reference: id,
        availableActions: ["VOID"],
        type: `${OMISE_PAYMENT_PREFIX}-card`,
      },
      transactionEvent: {
        status: "PENDING",
        name: eventType,
      },
    };
  }

  if (status === OmiseStatuses.Failed || status === OmiseStatuses.Expired) {
    return {
      id: metadata.id,
      transaction: {
        status,
        reference: id,
        type: `${OMISE_PAYMENT_PREFIX}-card`,
        availableActions: [],
      },
      transactionEvent: {
        status: "FAILURE",
        name: eventType,
      },
    };
  }

  if (status === OmiseStatuses.Successful) {
    return {
      id: metadata.id,
      transaction: {
        status,
        reference: id,
        type: `${OMISE_PAYMENT_PREFIX}-card`,
        amountAuthorized: {
          amount: getSaleorAmountFromInteger(getAmount("authorized")),
          currency,
        },
        amountCharged: {
          amount: getSaleorAmountFromInteger(getAmount("charged")),
          currency,
        },
        availableActions: [],
      },
      transactionEvent: {
        status: "SUCCESS",
        name: eventType,
      },
    };
  }
};
