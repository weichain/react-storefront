import { Divider } from "@/checkout-storefront/components/Divider";
import { PaymentMethods } from "./PaymentMethods";
import React from "react";

export const PaymentSection = ({ children }: any) => {
  return (
    <>
      <Divider />
      <div className="section" data-testid="paymentMethods">
        <PaymentMethods />
      </div>
    </>
  );
};
