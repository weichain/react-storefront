import React, { FC, useState } from "react";
import { Text } from "@saleor/ui-kit";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { SummaryItem, SummaryLine } from "./SummaryItem";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { SummaryMoneyRow } from "./SummaryMoneyRow";
import { SummaryPromoCodeRow } from "./SummaryPromoCodeRow";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";
import { getFormattedMoney } from "@/checkout-storefront/lib/utils/money";
import { Divider, Money } from "@/checkout-storefront/components";
import {
  CheckoutLineFragment,
  GiftCardFragment,
  Money as MoneyType,
  OrderLineFragment,
} from "@/checkout-storefront/graphql";
import { SummaryItemMoneySection } from "@/checkout-storefront/sections/Summary/SummaryItemMoneySection";
import { GrossMoney, GrossMoneyWithTax } from "@/checkout-storefront/lib/globalTypes";
import { summaryLabels, summaryMessages } from "./messages";
import { useSummaryHeightCalc } from "@/checkout-storefront/sections/Summary/useSummaryHeightCalc";

interface SummaryProps {
  editable?: boolean;
  lines: SummaryLine[];
  totalPrice?: GrossMoneyWithTax;
  subtotalPrice?: GrossMoney;
  giftCards?: GiftCardFragment[];
  voucherCode?: string | null;
  discount?: MoneyType | null;
  shippingPrice: GrossMoney;
}

export const Summary: FC<SummaryProps> = ({
  editable = true,
  lines,
  totalPrice,
  subtotalPrice,
  giftCards = [],
  voucherCode,
  shippingPrice,
  discount,
}) => {
  const formatMessage = useFormattedMessages();
  const [isOpen, setOpen] = useState(true);

  const { maxSummaryHeight, allItemsHeight } = useSummaryHeightCalc({
    linesCount: lines.length,
    onBreakpointChange: (breakpoint: "lg" | "md") => {
      setOpen(breakpoint === "lg");
    },
  });

  return (
    <div className="summary" style={{ backgroundColor: "#F0F0F0" }}>
      <div className={clsx("summary-title", isOpen && "open")}>
        <div className="flex flex-row items-center w-full" onClick={() => setOpen(!isOpen)}>
          <p style={{ fontSize: "24px", fontWeight: 600, color: "#1F1F1F" }}>
            {formatMessage(summaryMessages.title)}
          </p>
        </div>
        {!isOpen && (
          <Money
            ariaLabel={formatMessage(summaryLabels.totalPrice)}
            weight="bold"
            money={totalPrice?.gross}
          />
        )}
      </div>
      <div style={{ width: "90%", margin: " 25px auto" }}>
        <Divider className="mt-1 mb-4" />
      </div>
      <Transition
        show={isOpen}
        unmount={false}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <ul
          style={{ minHeight: "130vh" }}
          className={clsx(
            "summary-items",
            allItemsHeight > maxSummaryHeight
              ? "border-b border-border-secondary lg:overflow-y-scroll"
              : ""
          )}
        >
          {lines.map((line) => (
            <SummaryItem line={line} key={line?.id} />
          ))}
        </ul>
        <div className="summary-recap">
          <Divider className="mt-1 mb-4" />
          <SummaryMoneyRow
            label={formatMessage(summaryMessages.subtotalPrice)}
            money={subtotalPrice?.gross}
            ariaLabel={formatMessage(summaryLabels.subtotalPrice)}
          />
          {voucherCode && (
            <SummaryPromoCodeRow
              editable={editable}
              promoCode={voucherCode}
              ariaLabel={formatMessage(summaryLabels.voucher)}
              label={formatMessage(summaryMessages.voucher, { voucherCode })}
              money={discount}
              negative
            />
          )}
          {giftCards.map(({ currentBalance, displayCode, id }) => (
            <SummaryPromoCodeRow
              editable={editable}
              promoCodeId={id}
              ariaLabel={formatMessage(summaryLabels.giftCard)}
              label={formatMessage(summaryMessages.giftCard, {
                giftCardCode: `•••• •••• ${displayCode}`,
              })}
              money={currentBalance}
              negative
            />
          ))}
          <SummaryMoneyRow
            label={formatMessage(summaryMessages.shippingCost)}
            ariaLabel={formatMessage(summaryLabels.shippingCost)}
            money={shippingPrice?.gross}
          />
          <Divider className="my-4" />
          <div className="summary-row pb-4 items-baseline">
            <div className="flex flex-row items-baseline">
              <Text weight="bold">{formatMessage(summaryMessages.totalPrice)}</Text>
              <Text color="secondary" className="ml-2">
                {formatMessage(summaryMessages.taxCost, {
                  taxCost: getFormattedMoney(totalPrice?.tax),
                })}
              </Text>
            </div>
            <Money
              ariaLabel={formatMessage(summaryLabels.totalPrice)}
              weight="bold"
              money={totalPrice?.gross}
              data-testid="totalOrderPrice"
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};
