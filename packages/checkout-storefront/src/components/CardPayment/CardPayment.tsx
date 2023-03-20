import React, { useState } from "react";

import { CardInput, ConfirmHandler, CountryDropdown } from "./index";

export interface IReactCreditCardProps {
  name: string;
  number: string | number;
  expiry: string | number;
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
      <p style={{ fontSize: "20px", fontWeight: 600, color: "#1E1E1E" }}>Confirm & Pay</p>
      <p style={{ fontSize: "14px", fontWeight: 400, color: "#8F8F8F", marginTop: "20px" }}>
        One last check to make sure your details are correct before placing your order.
      </p>
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
