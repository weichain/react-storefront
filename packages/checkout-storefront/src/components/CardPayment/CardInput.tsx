/* eslint-disable import/no-restricted-paths */
import React from "react";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatCardName,
} from "../../../../../apps/saleor-app-checkout/utils/payments";
import { IReactCreditCardProps } from "./CardPayment";

export interface ICardInputProps {
  card: IReactCreditCardProps;
  setCard: (value: IReactCreditCardProps) => void;
}

export const CardInput: React.FC<ICardInputProps> = ({ card, setCard }) => {
  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = target;
    let { value } = target;
    if (name === "number") {
      value = formatCreditCardNumber(value);
      setCard({ ...card, number: value });
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
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
        <label>Name on card</label>
        <input
          style={{ color: "#475266" }}
          name="name"
          className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
          onChange={handleInputChange}
          value={card.name}
        />
      </div>
      <div className="flex flex-col">
        <label>Card number</label>
        <input
          style={{ color: "#475266" }}
          name="number"
          className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
          onChange={handleInputChange}
          value={card.number}
        />
      </div>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-5/12">
          <label>Expiry date</label>
          <input
            style={{ color: "#475266" }}
            name="expiry"
            className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
            onChange={handleInputChange}
            value={card.expiry}
          />
        </div>
        <div className="flex flex-col w-full lg:w-5/12">
          <label>Security code</label>
          <input
            style={{ color: "#475266" }}
            name="cvc"
            className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
            onChange={handleInputChange}
            value={card.cvc}
          />
        </div>
      </div>
    </>
  );
};
