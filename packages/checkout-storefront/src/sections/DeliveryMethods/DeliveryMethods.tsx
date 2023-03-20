import React from "react";

import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { CommonSectionProps } from "@/checkout-storefront/lib/globalTypes";

export const DeliveryMethods: React.FC<CommonSectionProps> = ({ collapsed }) => {
  const { checkout } = useCheckout();

  if (!checkout?.isShippingRequired || collapsed) {
    return null;
  }

  return (
    <div>
      <p style={{ fontSize: "20px", fontWeight: 600, color: "#1E1E1E" }}>Shipping</p>
      <div style={{ backgroundColor: "#F0F0F0", padding: "16px", marginTop: "25px" }}>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1E1E1E" }}>
          This is a digital item.
        </p>
        <p style={{ fontSize: "12px", fontWeight: 600, color: "#4C4C4C" }}>
          An e-mail has been sent to [e-mail] with instructions
        </p>
      </div>
    </div>
  );
};
