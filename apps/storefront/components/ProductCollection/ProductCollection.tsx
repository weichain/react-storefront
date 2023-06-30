import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { mapEdgesToItems } from "@/lib/maps";
import {
  OrderDirection,
  // ProductCollectionQuery,
  ProductCollectionQueryVariables,
  ProductFilterInput,
  ProductOrderField,
  useProductCollectionQuery,
} from "@/saleor/api";
import { Text } from "@saleor/ui-kit";
import { ProductCard } from "../ProductCard";
import { Pagination } from "../Pagination";
import { useRegions } from "../RegionsProvider";
import { Spinner } from "../Spinner";
import { messages } from "../translations";
//import invariant from "ts-invariant";

export interface ProductCollectionProps {
  filter?: ProductFilterInput;
  sortBy?: {
    field: ProductOrderField;
    direction?: OrderDirection;
  };
  allowMore?: boolean;
  perPage?: number;
  setCounter?: (value: number) => void;
  gridItems?: number;
}

interface IGridVariants {
  3: string;
  4: string;
}

export function ProductCollection({
  filter,
  sortBy,
  setCounter,
  allowMore = true,
  perPage = 3,
  gridItems,
}: ProductCollectionProps) {
  const t = useIntl();
  const { query } = useRegions();

  const variables: ProductCollectionQueryVariables = {
    filter,
    first: perPage,
    ...query,
    ...(sortBy?.field &&
      sortBy?.direction && {
        sortBy: {
          direction: sortBy.direction,
          field: sortBy.field,
        },
      }),
  };

  const gridVariants: IGridVariants = {
    3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9",
    4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9",
  };

  const { loading, error, data, fetchMore } = useProductCollectionQuery({
    variables,
  });

  useEffect(() => {
    if (setCounter) {
      setCounter(data?.products?.totalCount || 0);
    }
  }, [setCounter, data?.products?.totalCount]);

  const onLoadMore = () => {
    return fetchMore({
      variables: {
        after: data?.products?.pageInfo.endCursor,
      },
    });
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  const products = mapEdgesToItems(data?.products);
  if (products.length === 0) {
    return (
      <Text size="xl" color="secondary" data-testid="noResultsText">
        {t.formatMessage(messages.noProducts)}
      </Text>
    );
  }

  return (
    <div className="w-11/12 m-auto">
      <ul
        className={`${gridVariants[gridItems as keyof IGridVariants]}`}
        data-testid="productsList"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
      {allowMore && (
        <Pagination
          onLoadMore={onLoadMore}
          pageInfo={data?.products?.pageInfo}
          itemsCount={data?.products?.edges.length}
          totalCount={data?.products?.totalCount || undefined}
        />
      )}
    </div>
  );
}

export default ProductCollection;
