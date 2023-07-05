// import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import React, { ReactElement } from "react";

import { Layout, Spinner } from "@/components";
import { usePaths } from "@/lib/paths";
import { useRouter } from "next/router";
import { useOrderPaymentDetailsQuery, useOrderQuery } from "@/saleor/api";

function OrderCompletedPage() {
  const paths = usePaths();
  const router = useRouter();
  const { orderId } = router.query;

  const { data, loading } = useOrderQuery({
    variables: { id: orderId as string },
    skip: !router.isReady,
  });
  const { data: paymentData, loading: paymentLoading } = useOrderPaymentDetailsQuery({
    variables: { id: data?.order?.id as string },
    skip: !data?.order?.id,
  });

  if (loading || paymentLoading || !orderId) {
    return <Spinner />;
  }

  return (
    <main className="flex items-center justify-center text-center">
      {!paymentData?.order?.isPaid ? (
        <div className="h-96 flex justify-center items-center flex-col my-[88.3px]">
          <Image src="/triangle.jpg" alt="logo" width={100} height={100} />
          <p className="font-bold text-[32px] text-black">Payment Error</p>
          <p className="text-[14px] text-secondary">
            Payment was unsuccessful. Your credit card was not charged
          </p>
          <button
            type="button"
            className="bg-[#E7C130] text-[#1F1F1F] w-full h-10 text-[14px] mt-6"
          >
            <Link href={paths.$url()}>Back to Homepage</Link>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center my-[81.2px]">
          <Image src="/checkfilled.svg" alt="checklogo" width={50} height={50} />
          <p className="font-bold text-[32px] text-black mt-2.5 mb-4">Order Complete!</p>
          <p className="text-[14px] text-secondary w-11/12">
            We’ve sent an e-mail to <span>{data?.order?.userEmail}</span>. Please open it and follow
            the instructions{" "}
          </p>
          <button
            type="button"
            className="bg-[#E7C130] text-[#1F1F1F] w-full h-10 text-[14px] mt-12"
          >
            <Link href={paths.$url()}>Continue Browsing</Link>
          </button>
        </div>
      )}
    </main>
  );
  // return(
  //   <main className="container pt-8 px-8">
  //   <CheckIcon className="text-green-700" />
  //   <div className="font-semibold text-3xl">Your order is completed!</div>
  //   <p className="mt-2">
  //     <Link href={paths.$url()}>Go back to homepage</Link>
  //   </p>
  //   </main>
  // )
}

export default OrderCompletedPage;

OrderCompletedPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
