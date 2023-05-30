import { ApolloQueryResult } from "@apollo/client";
import clsx from "clsx";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
// import { useRouter } from "next/router";

import Custom404 from "pages/404";
import React, { ReactElement, useState } from "react";
import { useIntl } from "react-intl";

import { Layout, RichText, VariantSelector } from "@/components";
import { ProductGallery } from "@/components/product/ProductGallery";
import { useRegions } from "@/components/RegionsProvider";
import { ProductPageSeo } from "@/components/seo/ProductPageSeo";
import { messages } from "@/components/translations";
import { usePaths } from "@/lib/paths";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { contextToRegionQuery } from "@/lib/regions";
import { translate } from "@/lib/translations";
// import { AttributeDetails } from "@/components/product/AttributeDetails";
// import { getSelectedVariantID } from "@/lib/product";
import {
  CheckoutError,
  ProductBySlugDocument,
  ProductBySlugQuery,
  ProductBySlugQueryVariables,
  useCheckoutAddProductLineMutation,
  useCreateCheckoutMutation,
} from "@/saleor/api";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { useUser } from "@/lib/useUser";
import BackBtn from "@/components/BackBtn/BackBtn";

export type OptionalQuery = {
  variant?: string;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = async (
  context: GetStaticPropsContext<{ channel: string; locale: string; slug: string }>
) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }

  const productSlug = context.params.slug.toString();
  const response: ApolloQueryResult<ProductBySlugQuery> = await serverApolloClient.query<
    ProductBySlugQuery,
    ProductBySlugQueryVariables
  >({
    query: ProductBySlugDocument,
    variables: {
      slug: productSlug,
      ...contextToRegionQuery(context),
    },
  });

  return {
    props: {
      product: response.data.product,
    },
    revalidate: 60, // value in seconds, how often ISR will trigger on the server
  };
};
function ProductPage({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  // const router = useRouter();
  const paths = usePaths();
  const t = useIntl();
  const { currentChannel, query } = useRegions();

  const { checkoutToken, setCheckoutToken, checkout } = useCheckout();

  const [createCheckout] = useCreateCheckoutMutation();
  const { user } = useUser();

  const [addProductToCheckout] = useCheckoutAddProductLineMutation();
  const [loadingAddToCheckout, setLoadingAddToCheckout] = useState(false);
  const [addToCartError, setAddToCartError] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);

  if (!product?.id) {
    return <Custom404 />;
  }

  let selectedVariantID = "";
  if (product.variants?.length) {
    selectedVariantID = product.variants[0].id;
  }

  const selectedVariant = product?.variants?.find((v) => v?.id === selectedVariantID) || undefined;

  const onAddToCart = async () => {
    // Clear previous error messages
    setAddToCartError("");

    setLoadingAddToCheckout(true);
    // Block add to checkout button
    const errors: CheckoutError[] = [];

    if (!selectedVariantID) {
      return;
    }
    if (checkout) {
      // If checkout is already existing, add products
      const { data: addToCartData } = await addProductToCheckout({
        variables: {
          checkoutToken,
          variantId: selectedVariantID,
          locale: query.locale,
        },
      });
      addToCartData?.checkoutLinesAdd?.errors.forEach((e) => {
        if (e) {
          errors.push(e);
        }
      });
    } else {
      // Theres no checkout, we have to create one
      const { data: createCheckoutData } = await createCheckout({
        variables: {
          email: user?.email,
          channel: currentChannel.slug,
          billingAddress: {
            city: "CHELSEALAND",
            firstName: "Christian",
            lastName: "West",
            streetAddress1: "132 Mclean Meadow Suite 446",
            postalCode: "03962",
            country: "US",
            countryArea: "ME",
          },
          lines: [
            {
              quantity: itemQuantity,
              variantId: selectedVariantID,
            },
          ],
        },
      });
      createCheckoutData?.checkoutCreate?.errors.forEach((e) => {
        if (e) {
          errors.push(e);
        }
      });
      if (createCheckoutData?.checkoutCreate?.checkout?.token) {
        setCheckoutToken(createCheckoutData?.checkoutCreate?.checkout?.token);
      }
    }
    // Enable button
    setLoadingAddToCheckout(false);

    if (errors.length === 0) {
      // Product successfully added
      return;
    }

    // Display error message
    const errorMessages = errors.map((e) => e.message || "") || [];
    setAddToCartError(errorMessages.join("\n"));
  };

  const isAddToCartButtonDisabled =
    !selectedVariant || selectedVariant?.quantityAvailable === 0 || loadingAddToCheckout;

  const description = translate(product, "description");

  //const price = product.pricing?.priceRange?.start?.gross;
  //const shouldDisplayPrice = product.variants?.length === 1 && price;

  return (
    <>
      <ProductPageSeo product={product} />
      <BackBtn />
      <main
        className={clsx(
          "grid grid-cols-1 gap-[3rem] max-h-full overflow-auto md:overflow-hidden container pt-0 px-8 md:grid-cols-3"
        )}
      >
        <div className="col-span-2">
          <ProductGallery product={product} selectedVariant={selectedVariant} />
        </div>
        <div className="space-y-5 mt-10 md:mt-0">
          <div>
            {/* <h1
              className="text-4xl font-bold tracking-tight text-gray-800"
              data-testid="productName"
            >
              {translate(product, "name")}
            </h1>
            {shouldDisplayPrice && (
              <h2 className="text-xl font-bold tracking-tight text-gray-800">
                {formatPrice(price)}
              </h2>
            )} */}
            {!!product.category?.slug && (
              <Link
                href={paths.category._slug(product?.category?.slug).$url()}
                passHref
                legacyBehavior
              >
                <a>
                  <p className="text-[14px] mt-2 font-bold text-[#E0BC75] cursor-pointer">
                    {translate(product.category, "name")}
                  </p>
                </a>
              </Link>
            )}
            <h1
              className="text-[24px] font-bold tracking-tight text-black mt-4"
              data-testid="productName"
            >
              {translate(product, "name")}
            </h1>
            {/* {shouldDisplayPrice && (
              <h2 className="text-xl font-bold tracking-tight text-gray-800">
                {formatPrice(price)}
              </h2>
            )} */}
          </div>
          <hr />
          <VariantSelector
            product={product}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
          />
          <button
            onClick={onAddToCart}
            type="submit"
            disabled={isAddToCartButtonDisabled}
            className={clsx(
              "w-full py-3 px-8 flex items-center justify-center text-base bg-[#E7C130] text-[#1F1F1F] disabled:bg-[#E7C130] focus:outline-none"
            )}
            data-testid="addToCartButton"
          >
            {loadingAddToCheckout
              ? t.formatMessage(messages.adding)
              : t.formatMessage(messages.addToCart)}
          </button>
          {/* {!selectedVariant && (
            <p className="text-base text-yellow-600">
              {t.formatMessage(messages.variantNotChosen)}
            </p>
          )} */}
          {selectedVariant?.quantityAvailable === 0 && (
            <p className="text-base text-yellow-600" data-testid="soldOut">
              {t.formatMessage(messages.soldOut)}
            </p>
          )}

          {!!addToCartError && <p>{addToCartError}</p>}

          {description && (
            <div className="space-y-6">
              <RichText jsonStringData={description} />
            </div>
          )}
          {/* <AttributeDetails product={product} selectedVariant={selectedVariant} /> */}
        </div>
      </main>
    </>
  );
}

export default ProductPage;

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
