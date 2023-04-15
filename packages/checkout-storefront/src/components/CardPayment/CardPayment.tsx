import React, { useState } from "react";

import { CardInput, ConfirmHandler, CountryDropdown } from "./index";
import { Title } from "../Title";

export interface IReactCreditCardProps {
  name: string;
  number: string | number;
  expiry: string;
  cvc: string | number;
}

const CardPayment = () => {
  const [country, setCountry] = useState<string>("Thailand");
  const [checkedBox, setCheckedBox] = useState(true);
  const [card, setCard] = useState<IReactCreditCardProps>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  return (
    <div>
      <Title>Payment Providers</Title>
      <div className="flex flex-col gap-2 mt-4">
        <CardInput card={card} setCard={setCard} />
        <div className="flex flex-col gap-4">
          <CountryDropdown country={country} setCountry={setCountry} />
          <ConfirmHandler
            country={country}
            card={card}
            checkedBox={checkedBox}
            setCheckedBox={setCheckedBox}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
