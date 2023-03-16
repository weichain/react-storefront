import React from "react";

import { IReactCreditCardProps } from "./CardPayment";

export interface IConfrimHandlerProps {
  card: IReactCreditCardProps;
  country: string;
  checkedBox: boolean;
  setCheckedBox: (value: boolean) => void;
}
export const ConfirmHandler: React.FC<IConfrimHandlerProps> = ({
  country,
  card,
  checkedBox,
  setCheckedBox,
}) => {
  let enableBtn = false;
  if (
    String(card.number).length >= 17 &&
    String(card.expiry).length === 5 &&
    String(card.cvc).length === 3 &&
    card.name.trim().length > 2
  ) {
    enableBtn = true;
  }

  const submitHandler = () => {
    console.log(card, country, checkedBox);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        {/* TODO Change Color */}
        <input
          type="checkbox"
          id="checkbox"
          name="scales"
          checked={checkedBox}
          onChange={(e) => setCheckedBox(e.target.checked)}
        />
        <label htmlFor="checkbox" className="ml-4">
          By placing this order I have and accept the Terms and conditions and privacy policy
        </label>
      </div>
      <button
        disabled={!enableBtn}
        type="submit"
        style={{
          backgroundColor: enableBtn ? "#E7C130" : "#CBCBCB",
          width: "100%",
          height: "48px",
        }}
        onClick={submitHandler}
      >
        Place order
      </button>
    </>
  );
};
