/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import styled, { css } from "styled-components";

import { IReactCreditCardProps } from "./CardPayment";

export interface IConfrimHandlerProps {
  card: IReactCreditCardProps;
  country: string;
  checkedBox: boolean;
  setCheckedBox: (value: boolean) => void;
}

const Input = styled.input`
  ${() => css`
    border: 1px solid white;
    position: absolute;
      &:checked + svg {
      fill: #E7C130;
      }
    }
  `}
`;
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

  const cardDetails = {
    name: "JOHN DOE",
    number: "4242424242424242",
    expiration_month: 12,
    expiration_year: 2027,
    security_code: "123",
  };

  const submitHandler = () => {
    console.log(country, card, checkedBox);
    console.log(cardDetails);
  };

  const checkHandler = (e: any) => {
    setCheckedBox(e.target.checked);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Input
          type="checkbox"
          onClick={checkHandler}
          id="checkbox"
          style={{ opacity: 0 }}
          defaultChecked
        />
        {!checkedBox && <BsSquare fill={"#E7C130"} size={18} />}
        {checkedBox && <BsCheckSquare size={18} />}
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
