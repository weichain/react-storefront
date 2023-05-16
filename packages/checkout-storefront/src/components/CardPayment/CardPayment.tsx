import React, { useState } from "react";

import { CardInput, ConfirmHandler, CountryDropdown } from "./index";

export interface IReactCreditCardProps {
  name: string;
  number: string | number;
  expiry: string;
  cvc: string | number;
}

const CardPayment = () => {
  const [country, setCountry] = useState<string>("");
  const [card, setCard] = useState<IReactCreditCardProps>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  return (
    <div>
      <p className="text-[20px] text-[#1E1E1E] font-bold">Confirm & Pay</p>
      <p className="text-[14px] text-[#8F8F8F] mt-6">
        One last check to make sure your details are correct before placing your order.
      </p>
      <div className="flex flex-col gap-2 mt-4">
        <CardInput card={card} setCard={setCard} />
        <div className="flex flex-col gap-4">
          <CountryDropdown country={country} setCountry={setCountry} />
          <ConfirmHandler country={country} card={card} />
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
