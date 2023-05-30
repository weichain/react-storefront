import { relayStylePagination } from "@apollo/client/utilities";

import { TypedTypePolicies } from "@/saleor/api";

export const typePolicies: TypedTypePolicies = {
  User: {
    keyFields: false,
    merge: true,
    fields: {
      orders: relayStylePagination(),
    },
  },
  Query: {
    fields: {
      products: relayStylePagination(["filter", "sortBy"]),
    },
  },
};

export default typePolicies;
