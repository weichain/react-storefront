import React, { PropsWithChildren } from "react";
import { Text } from "@saleor/ui-kit";
import { Money, MoneyProps } from "@/checkout-storefront/components/Money";

export interface SummaryMoneyRowProps extends MoneyProps {
  label: string;
}

export const SummaryMoneyRow: React.FC<PropsWithChildren<SummaryMoneyRowProps>> = ({
  label,
  children,
  ...moneyProps
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row items-center">
        <Text color="secondary">{label}</Text>
        {children}
      </div>
      <Money {...moneyProps} color="secondary" />
    </div>
  );
};
