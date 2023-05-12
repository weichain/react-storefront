import { CheckoutLineFragment, OrderLineFragment } from "@/checkout-storefront/graphql";
import React, { PropsWithChildren } from "react";
import { PhotoIcon } from "@/checkout-storefront/icons";
import { useSummaryLineLineAttributesText, getSummaryLineProps } from "./utils";
import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";

export type SummaryLine = CheckoutLineFragment | OrderLineFragment;

interface LineItemProps {
  line: SummaryLine;
}

export const SummaryItem: React.FC<PropsWithChildren<LineItemProps>> = ({ line, children }) => {
  const { productName, productImage } = getSummaryLineProps(line);

  const attributesText = useSummaryLineLineAttributesText(line);

  return (
    <li className="summary-item">
      <div className="relative flex flex-row">
        <div className="summary-item-imagez-1">
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
      <div className="summary-row w-full">
        <div className="flex flex-col">
          <p className="text-[#E0BC75] text-[14px] font-bold">{attributesText}</p>
          <p className="mb-3 text-[#1F1F1F] font-bold">{productName}</p>
        </div>
        {children}
      </div>
    </li>
  );
};
