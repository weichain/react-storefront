import {
  useCheckoutUpdateState,
  useCheckoutUpdateStateActions,
} from "@/checkout-storefront/state/updateStateStore";
import {
  useCheckoutValidationActions,
  useCheckoutValidationState,
} from "@/checkout-storefront/state/checkoutValidationStateStore";
import { useCallback, useEffect } from "react";
import { useCheckoutFinalize } from "@/checkout-storefront/sections/CheckoutForm/useCheckoutFinalize";
import { useUser } from "@/checkout-storefront/hooks/useUser";
import { fieldValues } from "@/checkout-storefront/components/AddressForm";

export const useCheckoutSubmit = (card?: any) => {
  const { user } = useUser();
  const { validateAllForms } = useCheckoutValidationActions();
  const { validating, validationState } = useCheckoutValidationState();
  const { updateState, loadingCheckout, submitInProgress } = useCheckoutUpdateState();
  const { setShouldRegisterUser, setSubmitInProgress } = useCheckoutUpdateStateActions();
  const { checkoutFinalize, finalizing } = useCheckoutFinalize();

  const submitInitialize = useCallback(() => {
    setSubmitInProgress(true);
    setShouldRegisterUser(true);

    // only guest forms should be validated here
    if (!user) {
      validateAllForms();
    }
  }, [setShouldRegisterUser, setSubmitInProgress, user, validateAllForms]);

  const updateStateValues = Object.values(updateState);

  const anyRequestsInProgress =
    updateStateValues.some((status) => status === "loading") || loadingCheckout;

  const finishedApiChangesWithNoError =
    !anyRequestsInProgress && updateStateValues.every((status) => status === "success");

  const allFormsValid =
    !validating && Object.values(validationState).every((value) => value === "valid");

  //const allFormsValid = !validating && true;

  const handleSubmit = useCallback(async () => {
    if (!user) {
      if (!fieldValues.firstName || typeof fieldValues.phone === "string") return;
    }
    if (submitInProgress && finishedApiChangesWithNoError && allFormsValid) {
      void checkoutFinalize(card);
      setSubmitInProgress(false);
      return;
    }

    if (!validating && !anyRequestsInProgress) {
      setSubmitInProgress(false);
    }
  }, [
    submitInProgress,
    finishedApiChangesWithNoError,
    allFormsValid,
    anyRequestsInProgress,
    checkoutFinalize,
    setSubmitInProgress,
    validating,
    user,
  ]);

  useEffect(() => void handleSubmit(), [handleSubmit]);

  return {
    handleSubmit: submitInitialize,
    isProcessing: (submitInProgress && anyRequestsInProgress) || finalizing,
    validateAllForms,
    allFormsValid,
  };
};
