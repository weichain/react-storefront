/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from "react";

import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { IReactCreditCardProps } from "./CardPayment";
import { Checkbox } from "@saleor/ui-kit";
import { contactMessages } from "@/checkout-storefront/sections/Contact/messages";
import { useCheckoutSubmit } from "@/checkout-storefront/sections/CheckoutForm/useCheckoutSubmit";
import { getCardData } from "@/checkout-storefront/hooks/usePay";

export interface IConfrimHandlerProps {
  card: IReactCreditCardProps;
  country: string;
}

export const ConfirmHandler: React.FC<IConfrimHandlerProps> = ({ country, card }) => {
  const [checked, setChecked] = useState(false);
  const formatMessage = useFormattedMessages();
  const { handleSubmit, isProcessing } = useCheckoutSubmit();
  let enableBtn = false;
  if (
    String(card.number).length >= 17 &&
    String(card.expiry).length === 5 &&
    String(card.cvc).length === 3 &&
    card.name.trim().length > 2
  ) {
    enableBtn = true;
  }
  const month = card.expiry.split("/")[0];
  const year = "20" + card.expiry.split("/")[1];

  const cardDetails = {
    name: card.name,
    city: "Thailand",
    postal_code: 1000,
    number: String(card.number),
    expiration_month: Number(month),
    expiration_year: Number(year),
    security_code: String(card.cvc),
  };
  const submitHandler = async () => {
    getCardData(cardDetails);

    handleSubmit();
  };

  const checkHandler = (e: any) => {
    setCheckedBox(e.target.checked);
  };

  return (
    <>
      <div className="flex justify-between items-center relative">
        <div
          className="w-6 h-5 absolute bottom-5 -left-[1.5px] z-50 cursor-pointer"
          onClick={() => setChecked(() => !checked)}
        ></div>
        <Checkbox
          classNames={{ container: "!mb-0" }}
          name="billingSameAsShipping"
          label={formatMessage(contactMessages.acceptTerms)}
          data-testid={"useShippingAsBillingCheckbox"}
          checked={checked}
        />
      </div>
      <button
        onClick={submitHandler}
        disabled={!enableBtn}
        type="submit"
        className={`${
          enableBtn ? "bg-[#E7C130] text-[#1F1F1F]" : "bg-[#F0F0F0] text-[#8F8F8F]"
        } h-12`}
      >
        {isProcessing ? "Processing" : "Place order"}
      </button>
    </>
  );
};
