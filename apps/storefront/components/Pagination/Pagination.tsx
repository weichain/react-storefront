import { useIntl } from "react-intl";

import { PageInfo } from "@/saleor/api";

import { messages } from "../translations";

export interface PaginationProps {
  pageInfo?: PageInfo;
  onLoadMore: () => void;
  totalCount?: number;
  itemsCount?: number;
}

export function Pagination({ pageInfo, onLoadMore, itemsCount, totalCount }: PaginationProps) {
  const t = useIntl();
  if (!pageInfo || !pageInfo?.hasNextPage) {
    return null;
  }

  return (
    <nav className="mt-8 p-4 ">
      <div className="flex justify-center flex-col items-center">
        <button
          type="button"
          onClick={onLoadMore}
          className="relative inline-flex  items-center px-4 py-2 border border-[#E7C130] text-base font-medium text-[#1F1F1F] hover:border-blue-300 cursor-pointer"
        >
          {t.formatMessage(messages.loadMoreButton)}
        </button>
        {itemsCount && totalCount && (
          <div className="text-[14px] text-[#CBCBCB] mt-2">
            {t.formatMessage(messages.paginationProductCounter, {
              totalItemsCount: totalCount,
              currentItemsCount: itemsCount,
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
