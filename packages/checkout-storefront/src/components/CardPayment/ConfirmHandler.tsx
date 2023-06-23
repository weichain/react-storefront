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
import { useUser } from "@/checkout-storefront/hooks/useUser";
export interface IConfrimHandlerProps {
  card: IReactCreditCardProps;
  country: string;
}

interface IUserData {
  email: string;
  name: string;
  phone: string | undefined;
}

const userData = {
  email: "",
  name: "",
  phone: "",
} as IUserData;

export const getUserEmail = (email: string) => {
  if (email.includes("@") && email.includes(".")) {
    userData.email = email;
  } else {
    userData.email = "";
  }
};

export const getUserInputs = (name: string, phone: string | undefined) => {
  userData.name = name;
  userData.phone = phone;
};

export const ConfirmHandler: React.FC<IConfrimHandlerProps> = ({ country, card }) => {
  const [checked, setChecked] = useState(false);
  const formatMessage = useFormattedMessages();
  const { handleSubmit, isProcessing } = useCheckoutSubmit();
  const { user } = useUser();
  const { name, phone, email } = userData;
  let enableBtn = false;
  let validateFields = false;

  if (user) {
    validateFields = true;
  } else if (name && email && !phone) {
    validateFields = true;
  }

  if (
    String(card.number).length >= 17 &&
    String(card.expiry).length === 5 &&
    String(card.cvc).length === 3 &&
    card.name.trim().length > 2 &&
    checked &&
    validateFields
  ) {
    enableBtn = true;
  }

  const month = card.expiry.substring(0, 2);
  const year = "20" + card.expiry.substring(3, 5);

  const cardDetails = {
    name: card.name,
    city: country,
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
