/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
// import Omise from '../../../../../../../omise-node'
import { BsSquare, BsCheckSquare } from "react-icons/bs";
import styled, { css } from "styled-components";

import { IReactCreditCardProps } from "./CardPayment";
import { createChargeRequest } from "./utils/requests";
let omise = require("../../../../../../../omise-node")({
  publicKey: "pkey_test_5v0tzstq34vn9s6800h",
  secretKey: "skey_test_5v1asluvtklyiikdd5z",
});

// console.log(createTokenPromise)

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

  const month = card.expiry.split("/")[0];
  const year = "20" + card.expiry.split("/")[1];

  const cardDetails = {
    card: {
      name: card.name,
      city: country,
      postal_code: 1000,
      number: String(card.number),
      expiration_month: Number(month),
      expiration_year: Number(year),
      security_code: String(card.cvc),
    },
  };
  const submitHandler = async () => {
    const token = await omise.tokens.create(cardDetails);
    const result = await createChargeRequest("10000", "thb", token);

    // console.log('the result: ', await result.json())
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
