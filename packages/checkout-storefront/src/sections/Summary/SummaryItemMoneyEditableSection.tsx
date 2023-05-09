import { CheckoutLineFragment } from "@/checkout-storefront/graphql";
import { TextInput } from "@/checkout-storefront/components/TextInput";

import { Skeleton } from "@/checkout-storefront/components";
import { SummaryItemMoneyInfo } from "@/checkout-storefront/sections/Summary/SummaryItemMoneyInfo";
import { FormProvider } from "@/checkout-storefront/providers/FormProvider";
import { useSummaryItemForm } from "@/checkout-storefront/sections/Summary/useSummaryItemForm";

interface SummaryItemMoneyEditableSectionProps {
  line: CheckoutLineFragment;
}

export const SummaryItemMoneyEditableSection: React.FC<SummaryItemMoneyEditableSectionProps> = ({
  line,
}) => {
  const { form, onLineDelete } = useSummaryItemForm({ line });

  const {
    handleBlur,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    values: { quantity: quantityString },
  } = form;
  let quantity = parseInt(quantityString);

  const increase = () => {
    line.quantity += 1;
    quantity = line.quantity;
    form.values.quantity = String(line.quantity);
    handleQuantityInputBlur(event);
  };

  const decrease = () => {
    line.quantity -= 1;
    if (line.quantity === 0) {
      removeItem();
      return;
    } else {
      quantity = line.quantity;
      form.values.quantity = String(line.quantity);
      handleQuantityInputBlur(event);
    }
  };

  const removeItem = () => {
    void onLineDelete();
  };

  const handleQuantityInputBlur = (event: Event | undefined) => {
    handleBlur(event);

    if (quantity === line.quantity) {
      return;
    }
    const isQuantityValid = !Number.isNaN(quantity) && quantity >= 0;

    if (quantityString === "" || !isQuantityValid) {
      void setFieldValue("quantity", String(line.quantity));

      return;
    }

    void handleSubmit();
  };

  return (
    <div className="flex justify-between items-center relative -top-2">
      <div className="flex flex-row items-center">
        <img src="/minus.svg" alt="decrease" className="cursor-pointer" onClick={decrease} />
        <FormProvider form={form}>
          <TextInput
            name="quantity"
            classNames={{ container: "!w-13 !mb-0 text-center", input: "text-center !h-8" }}
            className="bg-transparent border-none w-8 text-center"
            label=""
          />
        </FormProvider>
        <img src="/plus.svg" alt="increase" className="cursor-pointer" onClick={increase} />
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
