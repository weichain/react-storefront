import { Divider } from "@/checkout-storefront/components/Divider";
// import { Title } from "@/checkout-storefront/components/Title";
// import { paymentSectionMessages } from "./messages";
//import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { PaymentMethods } from "./PaymentMethods";
import React from "react";
import { Children } from "@/checkout-storefront/lib/globalTypes";

export const PaymentSection: React.FC<Children> = ({ children }) => {
  //const formatMessage = useFormattedMessages();

  return (
    <>
      <Divider />
      <div className="section" data-testid="paymentMethods">
        {/* <Title>{formatMessage(paymentSectionMessages.paymentProviders)}</Title> */}
        <PaymentMethods />
        {children}
      </div>
      <Divider />
    </>
  );
};
