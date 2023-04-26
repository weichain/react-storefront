import React from "react";

import { ProductDetailsFragment } from "@/saleor/api";
import { useRegions } from "../RegionsProvider";

import Selector from "./Selector";

export interface VariantSelectorProps {
  product: ProductDetailsFragment;
}

export function VariantSelector({ product }: VariantSelectorProps) {
  const { formatPrice } = useRegions();
  const { variants } = product;

  // Skip displaying selector when theres less than 2 variants
  if (!variants || variants.length === 1) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-sm mb-2 text-[#4C4C4C]">Quantity</p>
          <Selector />
        </div>
        <div>
          <p className="text-sm text-secondary">PRICE PER ITEM</p>
          <p className="text-[24px] font-bold text-[#072137]">
            {formatPrice(variants[0].pricing?.price?.gross)}
          </p>
          <p className="text-sm text-secondary">+12% VAT Added</p>
        </div>
      </div>
    </div>
  );
}

export default VariantSelector;
