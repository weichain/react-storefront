//import React, { useEffect, useState } from "react";
// import { RadioGroup } from "@headlessui/react";
// import clsx from "clsx";
// import { useRouter } from "next/router";
// import { usePaths } from "@/lib/paths";
// import { translate } from "@/lib/translations";

import { ProductDetailsFragment } from "@/saleor/api";
import { useRegions } from "../RegionsProvider";

import Selector from "./Selector";

export interface VariantSelectorProps {
  product: ProductDetailsFragment;
  itemQuantity: number;
  setItemQuantity: (value: number) => void;
  // selectedVariantID?: string;
}

export function VariantSelector({ product, itemQuantity, setItemQuantity }: VariantSelectorProps) {
  // const paths = usePaths();
  // const router = useRouter();
  // const [selectedVariant, setSelectedVariant] = useState(selectedVariantID);
  const { formatPrice } = useRegions();
  const { variants } = product;
  // const [calculatePrice, setCalculatePrice] = useState(0);

  // console.log(variants[0].pricing?.price?.gross.amount);
  // useEffect(() => {
  //   // setCalculatePrice(() => variants[0].pricing?.price?.gross * itemQuantity)
  // }, [itemQuantity]);

  // Skip displaying selector when theres less than 2 variants
  if (!variants || variants.length === 1) {
    return null;
  }

  // const onChange = (value: string) => {
  //   setSelectedVariant(value);
  //   void router.replace(
  //     paths.products._slug(product.slug).$url({ ...(value && { query: { variant: value } }) }),
  //     undefined,
  //     {
  //       shallow: true,
  //       scroll: false,
  //     }
  //   );
  // };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-sm mb-2 text-[#4C4C4C]">Quantity</p>
          <Selector
            product={product}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
          />
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

    //  <RadioGroup value={selectedVariant} onChange={onChange}>
    //  <div className="space-y-4">
    //    {variants.map((variant) => (
    //      <RadioGroup.Option
    //        key={variant.id}
    //        value={variant.id}
    //        className={({ checked }) =>
    //          clsx("bg-main w-full", checked && "bg-brand", !checked && "")
    //        }
    //      >
    //        {({ checked }) => (
    //          <div
    //            className={clsx(
    //              "bg-white w-full h-full relative cursor-pointer object-contain border-2",
    //              checked && "border-brand",
    //              !checked && "hover:border-main border-main-2"
    //            )}
    //          >
    //            <RadioGroup.Label as="div" className="w-full justify-between p-4">
    //              <div className="flex flex-row gap-2 w-full font-semibold text-md">
    //                <div className="grow" data-testid={`variantOf${variant.name}`}>
    //                  {translate(variant, "name")}
    //                </div>
    //                <div>{formatPrice(variant.pricing?.price?.gross)}</div>
    //              </div>
    //            </RadioGroup.Label>
    //          </div>
    //        )}
    //      </RadioGroup.Option>
    //    ))}
    //     </RadioGroup>
  );
}

export default VariantSelector;
