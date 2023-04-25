import React, { FC, useState } from "react";
import { Text } from "@saleor/ui-kit";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { SummaryItem, SummaryLine } from "./SummaryItem";
import { ChevronDownIcon } from "@/checkout-storefront/icons";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";
import { SummaryMoneyRow } from "./SummaryMoneyRow";
import { SummaryPromoCodeRow } from "./SummaryPromoCodeRow";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";
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
  discount,
}) => {
  const formatMessage = useFormattedMessages();
  const [isOpen, setOpen] = useState(true);
  const [displaySummary, setDisplay] = useState(false);

  const { maxSummaryHeight, allItemsHeight } = useSummaryHeightCalc({
    linesCount: lines.length,
    onBreakpointChange: (breakpoint: "lg" | "md") => {
      setOpen(breakpoint === "lg" || displaySummary);
    },
  });

  return (
    <div className="summary">
      <div className="w-11/12 m-auto">
        <div className={clsx("summary-title", isOpen && "open")}>
          <div
            className="flex flex-row items-center w-full"
            onClick={() => setDisplay(!displaySummary)}
          >
            <p className="mb-0 text-[24px] text-[#1F1F1F] font-bold">
              {formatMessage(summaryMessages.title)}
            </p>
            <img src={getSvgSrc(ChevronDownIcon)} alt="chevron-down" />
          </div>
          {!isOpen && (
            <Money
              ariaLabel={formatMessage(summaryLabels.totalPrice)}
              weight="bold"
              money={totalPrice?.gross}
            />
          )}
        </div>
        <Divider className="my-4" />
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
            style={{ maxHeight: maxSummaryHeight ? `${maxSummaryHeight}px` : "" }}
            className={clsx(
              "summary-items",
              allItemsHeight > maxSummaryHeight
                ? "border-b border-border-secondary lg:overflow-y-scroll"
                : ""
            )}
          >
            {lines.map((line) => (
              <SummaryItem line={line} key={line?.id}>
                {editable ? (
                  <SummaryItemMoneyEditableSection line={line as CheckoutLineFragment} />
                ) : (
                  <SummaryItemMoneySection line={line as OrderLineFragment} />
                )}
              </SummaryItem>
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
            <Divider className="my-4" />
            <div className="summary-row pb-4 items-baseline">
              <div className="flex flex-row items-baseline">
                <Text color="secondary">{formatMessage(summaryMessages.totalPrice)}</Text>
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
    </div>
  );
};
