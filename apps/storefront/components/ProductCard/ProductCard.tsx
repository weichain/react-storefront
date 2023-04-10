import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { PhotographIcon } from "@heroicons/react/outline";
import { ProductCardFragment } from "@/saleor/api";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
  product: ProductCardFragment;
}

const getCardSecondaryDescription = (product: ProductCardFragment) => {
  const artistAttribute = product.attributes.find(
    (attribute) => attribute.attribute.slug === "artist"
  );
  const mainValue = artistAttribute?.values[0];
  if (mainValue?.name) {
    return mainValue.name;
  }
  if (product.category) {
    return translate(product.category, "name");
  }
  return "";
};

export function ProductCard({ product }: ProductCardProps) {
  const paths = usePaths();
  const secondaryDescription = getCardSecondaryDescription(product);
  const thumbnailUrl = product.media?.find((media) => media.type === "IMAGE")?.url;
  console.log(product);
  return (
    <li key={product.id} className="w-full cursor-pointer">
      <Link
        href={paths.products._slug(product.slug).$url()}
        prefetch={false}
        passHref
        legacyBehavior
      >
        <div className="relative">
          <a href="pass">
            <div className="bg-main active:bg-brand w-full aspect-1 duration-7000 ease-in-out">
              <div className="bg-white w-full h-full relative object-contain ">
                {thumbnailUrl ? (
                  <Image src={thumbnailUrl} alt="image" width={512} height={512} />
                ) : (
                  <div className="grid justify-items-center content-center h-full w-full">
                    <PhotographIcon className="h-10 w-10 content-center" />
                  </div>
                )}
              </div>
            </div>
            <p className={styles.description} data-testid={`productName${product.name}`}>
              {translate(product, "name")}
            </p>
            {secondaryDescription && (
              <p className={styles.secondaryDescription}>{secondaryDescription}</p>
            )}
          </a>
          <p
            className={styles.additionalDescription}
            style={{ fontSize: "14px", color: "#4C4C4C" }}
          >
            {product.seoDescription}
          </p>
          <p className={styles.secondaryDescription}>
            {product.pricing?.priceRange?.start?.gross.amount}$
          </p>
        </div>
      </Link>
    </li>
  );
}
