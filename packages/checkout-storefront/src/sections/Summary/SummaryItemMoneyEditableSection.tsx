/* eslint-disable react/button-has-type */
// import { Button, Text } from "@saleor/ui-kit";
// import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
// import { TextInput } from "@/checkout-storefront/components/TextInput";
import { CheckoutLineFragment } from "@/checkout-storefront/graphql";

import { Skeleton } from "@/checkout-storefront/components";
import { SummaryItemMoneyInfo } from "@/checkout-storefront/sections/Summary/SummaryItemMoneyInfo";
import { FormProvider } from "@/checkout-storefront/providers/FormProvider";
import { useSummaryItemForm } from "@/checkout-storefront/sections/Summary/useSummaryItemForm";
// import { summaryMessages } from "./messages";
// import { useMemo } from "react";

interface SummaryItemMoneyEditableSectionProps {
  line: CheckoutLineFragment;
}

export const SummaryItemMoneyEditableSection: React.FC<SummaryItemMoneyEditableSectionProps> = ({
  line,
}) => {
  // const formatMessage = useFormattedMessages();
  const { form, onLineDelete } = useSummaryItemForm({ line });

  const {
    // handleBlur,
    // handleSubmit,
    setFieldValue,
    isSubmitting,
    // values: { quantity: quantityString },
  } = form;

  //const quantity = useMemo(() => parseInt(quantityString), [quantityString]);

  const increase = () => {
    void setFieldValue("quantity", String(line.quantity + 1));
  };

  const decrease = () => {
    void setFieldValue("quantity", String(line.quantity - 1));
  };

  const removeItem = () => {
    void onLineDelete();
  };

  // const handleQuantityInputBlur = (event: React.FocusEvent<any, Element>) => {
  //   handleBlur(event);

  //   if (quantity === line.quantity) {
  //     return;
  //   }

  //   const isQuantityValid = !Number.isNaN(quantity) && quantity >= 0;

  //   if (quantityString === "" || !isQuantityValid) {
  //     void setFieldValue("quantity", String(line.quantity));
  //     return;
  //   }

  //   if (quantity === 0) {
  //     void onLineDelete();
  //     return;
  //   }

  //   void handleSubmit();
  // };

  return (
    <div className="flex justify-between items-center relative -top-2">
      <div className="flex flex-row items-center">
        {/* <Text size="xs" className="mr-2">
          {formatMessage(summaryMessages.quantity)}:
        </Text> */}
        <FormProvider form={form}>
          <div className="flex justify-between items-center w-[80px]">
            <button onClick={decrease}>
              <img
                src="/minus.svg"
                alt="decrease"
                className="cursor-pointer w-6"
                onClick={decrease}
              />
            </button>
            <p>{line.quantity}</p>
            <button onClick={increase}>
              <img
                src="/plus.svg"
                alt="increase"
                className="cursor-pointer w-6"
                onClick={increase}
              />
            </button>
          </div>
        </FormProvider>
        <img
          src="/trash.svg"
          alt="bin"
          className="absolute bottom-[60px] right-0 cursor-pointer"
          onClick={removeItem}
        />
      </div>
      {isSubmitting ? (
        <div className="flex flex-col items-end mt-3 w-full">
          <Skeleton className="w-full" />
          <Skeleton className="w-2/3" />
        </div>
      ) : (
        <SummaryItemMoneyInfo {...line} classNames={{ container: "mt-1" }} />
      )}
    </div>
  );
};
