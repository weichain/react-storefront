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
        <span className="px-2 font-poppins font-semibold text-4xl leading-8 tracking-tighter text-gray-900">
          Orders
        </span>
      </div>
      <table className="w-full divide-y bg-white rounded-md ">
        <thead className="text-center h-16">
          <tr>
            <th className="w-1/4 font-semibold text-md font-poppins text-base leading-6 tracking-tighter text-gray-500">
              ORDER
            </th>
            <th className="w-1/4 font-semibold text-md font-poppins text-base leading-6 tracking-tighter text-gray-500">
              DATE
            </th>
            <th className="w-1/4 font-semibold text-md md:text-center hidden md:table-cell font-poppins text-base leading-6 tracking-tighter text-gray-500">
              STATUS
            </th>
            <th className="w-1/4 font-semibold text-md font-poppins text-base leading-6 tracking-tighter text-gray-500">
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
              <td>{order?.number}</td>
              <td>{formatDate(order.created)}</td>

              <td className="hidden md:table-cell">
                <div className="flex flex-row justify-center gap-2">
                  <Image src={getIcon(order.status)} alt="Example Image" width={15} height={15} />
                  {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                </div>
              </td>
              <td>{formatPrice(order.total.gross)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
