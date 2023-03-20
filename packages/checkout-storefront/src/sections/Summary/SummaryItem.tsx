import { CheckoutLineFragment, OrderLineFragment } from "@/checkout-storefront/graphql";
import React, { PropsWithChildren } from "react";
import { PhotoIcon } from "@/checkout-storefront/icons";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { useSummaryLineLineAttributesText, getSummaryLineProps } from "./utils";
import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";
import { summaryLabels } from "./messages";
import { SummaryItemMoneyEditableSection } from "./SummaryItemMoneyEditableSection";

export type SummaryLine = CheckoutLineFragment | OrderLineFragment;

interface LineItemProps {
  line: SummaryLine;
}

export const SummaryItem: React.FC<PropsWithChildren<LineItemProps>> = ({ line, children }) => {
  const { productName, productImage } = getSummaryLineProps(line);

  const formatMessage = useFormattedMessages();

  const attributesText = useSummaryLineLineAttributesText(line);

  return (
    <li className="summary-item">
      <div className="relative flex flex-row">
        <div className="summary-item-image mr-4 z-1">
          {productImage ? (
            <img
              className="object-contain"
              alt={productImage?.alt || undefined}
              src={productImage?.url}
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <img className="object-cover" alt="product placeholder" src={getSvgSrc(PhotoIcon)} />
          )}
        </div>
      </div>
      <div className="summary-row w-full items-start">
        <div className="flex flex-col">
          <p
            aria-label={formatMessage(summaryLabels.summaryItemName)}
            className="mb-3"
            style={{ color: "#E0BC75", fontSize: "14px", fontWeight: 600 }}
          >
            {productName}
          </p>
          <p
            aria-label={formatMessage(summaryLabels.variantName)}
            className="max-w-38"
            style={{ color: "#1F1F1F", fontSize: "16px", fontWeight: 600 }}
          >
            {attributesText}
          </p>
          <SummaryItemMoneyEditableSection line={line as CheckoutLineFragment} />
        </div>
        {children}
      </div>
    </li>
  );
};
