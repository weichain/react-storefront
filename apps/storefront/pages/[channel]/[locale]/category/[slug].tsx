import { ApolloQueryResult } from "@apollo/client";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Custom404 from "pages/404";
import React, { ReactElement } from "react";

import { Layout } from "@/components";
import { FilteredProductList } from "@/components/productList/FilteredProductList/FilteredProductList";
import { CategoryPageSeo } from "@/components/seo/CategoryPageSeo";
import { mapEdgesToItems } from "@/lib/maps";
import { contextToRegionQuery } from "@/lib/regions";
import { translate } from "@/lib/translations";
import {
  AttributeFilterFragment,
  CategoryBySlugDocument,
  CategoryBySlugQuery,
  CategoryBySlugQueryVariables,
  FilteringAttributesQuery,
  FilteringAttributesQueryDocument,
  FilteringAttributesQueryVariables,
} from "@/saleor/api";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ channel: string; locale: string; slug: string }>
) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }

  const categorySlug = context.params.slug.toString();
  const response: ApolloQueryResult<CategoryBySlugQuery> = await serverApolloClient.query<
    CategoryBySlugQuery,
    CategoryBySlugQueryVariables
  >({
    query: CategoryBySlugDocument,
    variables: {
      slug: categorySlug,
      locale: contextToRegionQuery(context).locale,
    },
  });

  const attributesResponse: ApolloQueryResult<FilteringAttributesQuery> =
    await serverApolloClient.query<FilteringAttributesQuery, FilteringAttributesQueryVariables>({
      query: FilteringAttributesQueryDocument,
      variables: {
        ...contextToRegionQuery(context),
        filter: {
          inCategory: response.data.category?.id,
        },
      },
    });

  const attributes: AttributeFilterFragment[] = mapEdgesToItems(
    attributesResponse.data.attributes
  ).filter((attribute) => attribute.choices?.edges.length);

  return {
    props: {
      category: response.data.category,
      attributeFiltersData: attributes,
    },
  };
};

function CategoryPage({
  category,
  attributeFiltersData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!category) {
    return <Custom404 />;
  }

  return (
    <>
      <CategoryPageSeo category={category} />
      <p
        style={{
          color: "#1E1E1E",
          fontSize: "48px",
          fontWeight: 600,
          width: "83%",
          margin: "70px auto 16px",
        }}
      >
        {translate(category, "name")}
      </p>
      {/* TODO Fix the description and check the category if it is seoDescription or description */}
      <p
        style={{
          color: "#8F8F8F",
          fontSize: "20px",
          margin: "0 auto 64px",
          width: "83%",
        }}
      >
        Here must be the description
      </p>

      <div className="mt-4 w-11/12 m-auto">
        <FilteredProductList
          attributeFiltersData={attributeFiltersData}
          categoryIDs={[category.id]}
        />
      </div>
    </>
  );
}

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
