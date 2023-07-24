/* eslint-disable import/no-restricted-paths */
import React from "react";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatCardName,
  checkExpiryDate,
  checkCreditCardType,
} from "./utils/payments";
import { IReactCreditCardProps } from "./CardPayment";
//import { useCheckoutFinalize } from "@/checkout-storefront/sections/CheckoutForm/useCheckoutFinalize";

export interface ICardInputProps {
  card: IReactCreditCardProps;
  setCard: (value: IReactCreditCardProps) => void;
  validExpiryDate: boolean | undefined;
  setValidExpiryDate: (value: boolean | undefined) => void;
  creditCardType: string | undefined;
  setCreditCardType: (value: string) => void;
  submitError: boolean;
}

export const CardInput: React.FC<ICardInputProps> = ({
  card,
  setCard,
  validExpiryDate,
  setValidExpiryDate,
  creditCardType,
  setCreditCardType,
  submitError,
}) => {
  // const { error } = useCheckoutFinalize();
  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = target;
    let { value } = target;
    if (name === "number") {
      value = formatCreditCardNumber(value);
      setCreditCardType(checkCreditCardType(value));
      setCard({ ...card, number: value });
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
      setValidExpiryDate(checkExpiryDate(value));
      setCard({ ...card, expiry: value });
    } else if (name === "cvc") {
      value = formatCVC(value);
      setCard({ ...card, cvc: value });
    } else if (name === "name") {
      if (formatCardName(value)) {
        setCard({ ...card, name: value });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
          Name on card
        </label>
        <input
          name="name"
          className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
          onChange={handleInputChange}
          value={card.name}
        />
      </div>
      <div className="flex flex-col relative">
        <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
          Card number
        </label>
        <input
          name="number"
          className={`${
            (typeof creditCardType !== "undefined" && !creditCardType) || submitError
              ? "border border-[#ff0000] mb-0"
              : ""
          } min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none`}
          onChange={handleInputChange}
          value={card.number}
        />
        {(typeof creditCardType !== "undefined" && !creditCardType) || submitError ? (
          <p className="text-[#ff0000]">This card number is not valid</p>
        ) : null}
      </div>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-5/12">
          <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
            Expiry date
          </label>
          <input
            name="expiry"
            className={`${
              typeof validExpiryDate !== "undefined" && !validExpiryDate
                ? "border border-[#ff0000] mb-0"
                : ""
            } min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none`}
            onChange={handleInputChange}
            value={card.expiry}
          />
          {typeof validExpiryDate !== "undefined" && !validExpiryDate ? (
            <p className="text-[#ff0000]">Expiry date is not valid</p>
          ) : null}
        </div>
        <div className="flex flex-col w-full lg:w-5/12 relative">
          <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
            Security code
          </label>
          <input
            name="cvc"
            className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
            onChange={handleInputChange}
            value={card.cvc}
          />
        </div>
      </div>
    </>
  );
};
