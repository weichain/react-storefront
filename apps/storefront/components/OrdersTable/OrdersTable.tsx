import { useRouter } from "next/router";
import Image from "next/image";

import { usePaths } from "@/lib/paths";
import { OrderDetailsFragment } from "@/saleor/api";
import Unfulfilled from "public/Unfulfilled.png";
import Canceled from "public/circle-xmark.png";
import Fulfilled from "public/circle-check.png";
import Unconfirmed from "public/circle-ellipsis.png";

import { useRegions } from "../RegionsProvider";

export interface OrdersTableProps {
  orders: OrderDetailsFragment[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const paths = usePaths();
  const { formatPrice } = useRegions();
  const quantity = 1;

  const formatDate = (date: string): string => {
    const _date = new Date(date);
    return `${_date.getDay()}/${_date.getMonth()}/${_date.getFullYear()}`;
  };

  const getIcon = (label: string) => {
    switch (label) {
      case "CANCELED":
        return Canceled;
      case "UNFULFILLED":
        return Unfulfilled;
      case "FULFILLED":
        return Fulfilled;
      case "UNCONFIRMED":
        return Unconfirmed;
      default:
        return Unconfirmed;
    }
  };
  return (
    <>
      <div className="flex flex-row items-start px-4 gap-10">
        <span className="px-2 pt-6 font-poppins font-semibold text-4xl leading-8 tracking-tighter text-gray-900">
          Orders
        </span>
      </div>
      <table className="w-full divide-y bg-white rounded-md ">
        <thead className="text-center h-16">
          <tr>
            <th className="w-1/4 font-normal text-md font-poppins text-base leading-6 tracking-tighter text-secondary">
              ORDER
            </th>
            <th className="w-1/4 font-normal text-md font-poppins text-base leading-6 tracking-tighter text-secondary">
              DATE
            </th>
            <th className="w-1/4 font-normal text-md md:text-center hidden md:table-cell font-poppins text-base leading-6 tracking-tighter text-secondary">
              STATUS
            </th>
            <th className="w-1/4 font-normal text-md font-poppins text-base leading-6 tracking-tighter text-secondary">
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody className="text-center divide-y">
          {orders?.map((order) => (
            <tr
              className="h-16 cursor-pointer"
              key={order.id}
              onClick={() =>
                router.push(paths.account.orders._token(order.token, order.created).$url())
              }
            >
              <td className="text-[14px]">{order?.number}</td>
              <td className="text-[14px]">{formatDate(order.created)}</td>

              <td className="hidden md:table-cell text-[14px]">
                <div className="flex w-[50%] xl:w-[60%] m-auto mr-[25px]">
                  <Image
                    src={getIcon(order.status)}
                    alt="Example Image"
                    width={18}
                    height={15}
                    className="w-[20px] mr-[7px] hidden xl:block"
                  />
                  <p className="text-left">
                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                  </p>
                </div>
              </td>
              <td className="text-[14px]">{formatPrice(quantity, order.total.gross)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
