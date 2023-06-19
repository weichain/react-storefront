import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/legacy/image";
import { ReactElement } from "react";

import { AccountLayout, Spinner } from "@/components";
//import { AddressDisplay } from "@/components/checkout/AddressDisplay";
import { useRegions } from "@/components/RegionsProvider";
import { useOrderDetailsByTokenQuery, useUserQuery } from "@/saleor/api";
import { useUser } from "@/lib/useUser";
import { useRouter } from "next/router";
import { formatDate, getIcon } from "@/components/OrdersTable/OrdersTable";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      token: context.params?.token?.toString(),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
function OrderDetailsPage({ token }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { formatPrice } = useRegions();
  const { authenticated } = useUser();
  const router = useRouter();
  const { loading, error, data } = useOrderDetailsByTokenQuery({
    variables: { token: token as string },
    skip: !token || !authenticated,
  });
  const { data: dataUser } = useUserQuery();

  if (loading) return <Spinner />;
  if (error) {
    return <div>Error :{error.message}</div>;
  }

  if (!data || !data.orderByToken || !data.orderByToken.privateMetafield) {
    return null;
  }

  const { lastDigits, brand } = JSON.parse(data.orderByToken.privateMetafield);
  const order = data.orderByToken;

  return (
    <>
      <div
        className="objectFit flex items-center cursor-pointer my-5"
        onClick={() => router.back()}
      >
        <Image src="/left.svg" alt="back" width={20} height={20} />
        <p className="text-[16px] underline">Back</p>
      </div>
      <h1 className="text-[24px]  font-bold text-black !mt-0 mb-2">Order : {order?.number}</h1>
      <div className="flex">
        <h1 className="text-[12px] text-secondary">
          ORDER STATE:{" "}
          <span className="text-black text-[12px]">
            {formatDate(router.query.created as string)}
          </span>
        </h1>
        <div className="flex">
          <h1 className="text-[12px] ml-2 md:ml-20 text-secondary mr-2">STATUS :</h1>
          <div className="flex">
            <Image
              src={getIcon(order.status)}
              alt="Example Image"
              width={18}
              height={15}
              className="w-[20px] ml-[10px] mr-[10px]"
            />{" "}
            <span className="text-black text-[12px]  ml-2">{order?.status}</span>
          </div>
        </div>
      </div>
      <hr />
      <div>
        {order.lines.map((line) => (
          <div key={line.id} className="flex justify-between items-center">
            <div className="flex">
              <Image
                src={line?.thumbnail?.url || "/"}
                alt={line?.thumbnail?.alt || " "}
                width={80}
                height={80}
              />
              <div className="flex flex-col justify-center">
                <p className="text-[14px] font-[600] text-[#E0BC75]">{line?.variantName}</p>
                <p className="text-[16px] font-[600] text-[#1F1F1F]">{line?.productName}</p>
              </div>
            </div>
            <div>
              <p className="text-[#072137] font-[600] text-[16px]">
                {formatPrice(line?.unitPrice.gross)}
              </p>
              <p className="text-secondary text-[12px] text-right">QTY: {line?.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex justify-between">
        <div>
          <p className="text-black text-[20px] font-[600]">Payment</p>
          <p className="text-[#4C4C4C] text-[16px]">
            {brand} **{lastDigits.substr(2)}
          </p>
        </div>
        <div className="w-6/12">
          <p className="font-[600] text-[20px] text-black mb-5">Order summary</p>
          <div className="flex justify-between items-center">
            <p className="text-[16px] text-secondary">Subtotal</p>
            <p className="text-[16px] text-[#072137]"> {formatPrice(order?.subtotal.net)}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Image src="/taxicon.svg" alt="/issues" width={50} height={26} />
            </div>
            <p className="text-[16px] text-[#072137]">-</p>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between items-center">
            <p className="text-[16px] text-secondary">Total</p>
            <p className="text-[16px] text-[#072137] font-[600]">
              {" "}
              {formatPrice(order?.total.gross)}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <div>
          <p className="text-black text-[20px] font-[600]">Need help?</p>
          <div className="flex flex-col">
            <Image src="/issues.svg" alt="/issues" width={50} height={30} />
            <Image
              src="/contact.svg"
              alt="/contact"
              width={30}
              height={20}
              className="!mr-[10px]"
            />
          </div>
        </div>
        <div className="w-6/12">
          <p className="text-[20px] text-black font-[600] mb-4">Delivery</p>
          <div className="bg-[#F0F0F0] p-5">
            <p className="text-[14px] text-black font-[600]">This is a digital item.</p>
            <p className="text-[12px] text-[#4C4C4C] w-[75%]">
              An e-mail has been sent to <span>{dataUser?.user?.email}</span> with instructions
            </p>
          </div>
        </div>
      </div>
      {/* ------ OLD VERSION ---- */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 mb-20 mt-10 ml-2 md:ml-20 max-w-6xl h-full">
        <div className="col-span-2 md:col-span-4">
          <table className="w-full divide-y table-fixed">
            <thead className="text-center">
              <tr>
                <td className="md:w-1/4 font-semibold text-md md:text-center text-left">Items</td>
                <td className="md:w-1/4 font-semibold text-md">Price</td>
                <td className="md:w-1/4 font-semibold text-md">Quantity</td>
                <td className="md:w-1/4 font-semibold text-md text-right">
                  <p className="mr-3 md:mr-10">Total</p>
                </td>
              </tr>
            </thead>
            <tbody className="text-center divide-y">
              {order?.lines.map((line) => (
                <tr key={line?.id} className="h-16">
                  <td className="my-3">
                    <div className="flex flex-row justify-center">
                      <Image
                        src={line?.thumbnail?.url || "/"}
                        alt={line?.thumbnail?.alt || " "}
                        width={70}
                        height={70}
                      />
                      <div className="flex flex-col justify-center">
                        <div>{line?.productName}</div>
                        <div className="text-xs text-left text-gray-600">{line?.variantName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{formatPrice(quantity, line?.unitPrice.gross)}</td>
                  <td>{line?.quantity}</td>
                  <td>
                    <p className="mr-3 md:mr-10 text-right">
                      {formatPrice(quantity, line?.totalPrice.gross)}
                    </p>
                  </td>
                </tr>
              ))}
              <tr />
            </tbody>
          </table>
        </div> 
         <div className="md:col-start-3 text-md h-16">
          <div className="mt-5 text-left md:text-center">Subtotal</div>
        </div>
        <div className="text-md text-center">
          <p className="mt-5 text-right mr-3 md:mr-10">
            {formatPrice(quantity, order?.subtotal.net)}
          </p>
        </div>
        <div className="md:col-start-3 col-span-2 border-t" />
        <div className="md:col-start-3 text-md h-16">
          <div className="mt-5 text-left md:text-center">Shipping Price</div>
        </div>
        <div className="text-md text-center">
          <p className="mt-5 text-right mr-3 md:mr-10">
            {formatPrice(quantity, order?.shippingPrice.gross)}
          </p>
        </div>
        <div className="md:col-start-3 col-span-2 border-t" />
        <div className="md:col-start-3 text-md font-semibold h-16">
          <div className="mt-5 text-left md:text-center">Total</div>
        </div>
        <div className="text-md font-semibold text-center">
          <p className="mt-5 text-right mr-3 md:mr-10">
            {formatPrice(quantity, order?.total.gross)}
          </p>
        </div>

        {!!order?.billingAddress && (
          <div className="col-span-2 mr-2 my-2 p-4 rounded shadow-xs bg-white border md:w-1/2 md:col-span-2 md:w-full">
            <h2 className="font-semibold text-lg mb-2">Billing Address </h2>
            <AddressDisplay address={order.billingAddress} />
          </div>
        )}

        {!!order?.shippingAddress && (
          <div className="col-span-2 mr-2 md:ml-2 my-2 p-4 shadow-xs rounded bg-white border md:w-1/2 md:col-start-3 md:col-span-2 md:w-full">
            <h2 className="font-semibold text-lg mb-2">Shipping Address </h2>
            <AddressDisplay address={order.shippingAddress} />
          </div>
        )}
      </div> */}
    </>
  );
}

export default OrderDetailsPage;

OrderDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
