/* eslint-disable import/no-restricted-paths */
import React from "react";

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatCardName,
} from "./utils/payments";
import { IReactCreditCardProps } from "./CardPayment";
import { cardImages } from "./images";

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
      <div className="flex flex-col relative">
        <label>Card number</label>
        <input
          style={{ color: "#475266", borderColor: "rgb(185 193 207", borderRadius: "5px" }}
          name="number"
          className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
          onChange={handleInputChange}
          value={card.number}
        />
        <img
          src="/inputcard.svg.svg"
          alt="logo"
          style={{
            position: "absolute",
            right: "13px",
            top: "26px",
            width: "36px",
          }}
        />
        <div className="flex">
          {cardImages.map((image) => (
            <img key={image} src={`/${image}.svg`} alt="card" width="30px" />
          ))}
        </div>
      </div>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-5/12">
          <label>Expiry date</label>
          <input
            style={{ color: "#475266", borderColor: "rgb(185 193 207", borderRadius: "5px" }}
            name="expiry"
            className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
            onChange={handleInputChange}
            value={card.expiry}
          />
        </div>
        <div className="flex flex-col w-full lg:w-5/12 relative">
          <label>CVC / CVV</label>
          <input
            style={{ color: "#475266", borderColor: "rgb(185 193 207", borderRadius: "5px" }}
            name="cvc"
            className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
            onChange={handleInputChange}
            value={card.cvc}
          />
          <img
            src="/cvv.svg"
            alt="logo"
            style={{
              position: "absolute",
              right: "13px",
              top: "26px",
              width: "38px",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label>Name on card</label>
        <input
          style={{ color: "#475266", borderColor: "rgb(185 193 207", borderRadius: "5px" }}
          name="name"
          className="min-w-8 h-3 mb-2 max-w-full border border-skeleton pt-6 pb-4 px-6 outline-none"
          onChange={handleInputChange}
          value={card.name}
        />
      </div>
    </>
  );
};
