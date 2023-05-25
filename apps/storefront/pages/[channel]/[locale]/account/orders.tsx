import React, { ReactElement, useState } from "react";

import { AccountLayout, OrdersTable, Pagination, Spinner } from "@/components";
import { mapEdgesToItems } from "@/lib/maps";
import { useOrdersQuery } from "@/saleor/api";
import { useUser } from "@/lib/useUser";
import { WatchQueryFetchPolicy } from "@apollo/client";

function OrdersPage() {
  const [value, setValue] = useState("cache-first");
  const [number, setNumber] = useState(0);
  const { authenticated } = useUser();
  const {
    data: ordersCollection,
    loading,
    error,
    fetchMore,
  } = useOrdersQuery({
    fetchPolicy: value as WatchQueryFetchPolicy,
    skip: !authenticated,
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        Error
        {error.message}
      </p>
    );
  }

  const orders = mapEdgesToItems(ordersCollection?.me?.orders);

  const onLoadMore = () => {
    setValue("cache-only");
    setNumber(10);
    return fetchMore({
      variables: {
        after: ordersCollection?.me?.orders?.pageInfo.endCursor,
      },
    });
  };

  return (
    <>
      <OrdersTable orders={orders} />
      <Pagination
        onLoadMore={onLoadMore}
        pageInfo={ordersCollection?.me?.orders?.pageInfo}
        itemsCount={(ordersCollection?.me?.orders?.edges.length as number) + number}
        totalCount={ordersCollection?.me?.orders?.totalCount || undefined}
      />
    </>
  );
}

export default OrdersPage;

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
