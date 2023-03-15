import Link from "next/link";
import Image from "next/image";
import React from "react";
import { UrlObject } from "url";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { HomepageBlockFragment, ProductFilterInput } from "@/saleor/api";

import { ProductCollection } from "../ProductCollection";
import { RichText } from "../RichText";
import styles from "./HomepageBlock.module.css";

export interface HomepageBlockProps {
  menuItem: HomepageBlockFragment;
}

export function HomepageBlock({ menuItem }: HomepageBlockProps) {
  const paths = usePaths();
  const filter: ProductFilterInput = {};
  if (menuItem.page?.id) {
    const content = translate(menuItem.page, "content");
    return <div className="pb-10">{content && <RichText jsonStringData={content} />}</div>;
  }
  let link: UrlObject = {};
  if (menuItem.category?.id) {
    filter.categories = [menuItem.category?.id];
    link = paths.category._slug(menuItem.category.slug).$url();
  }
  if (menuItem.collection?.id) {
    filter.collections = [menuItem.collection?.id];
    link = paths.collection._slug(menuItem.collection.slug).$url();
  }

  return (
    <div className="pb-8" data-testid="category">
      <div className={styles.viewAll}>
        <Link href={link} passHref legacyBehavior>
          <a href="pass">
            <Image src="/ViewAll.png" alt="viewAll" width={80} height={80} />
          </a>
        </Link>
        <h1
          className="text-3xl font-extrabold tracking-tight text-gray-900"
          data-testid={`categoryName${menuItem.name}`}
        >
          {translate(menuItem, "name")}
        </h1>
      </div>
      <ProductCollection filter={filter} allowMore={false} />
    </div>
  );
}

export default HomepageBlock;
