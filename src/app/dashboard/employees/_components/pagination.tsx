"use client";

import {
  isValidPageNumber,
  isValidPageSize,
} from "@/lib/utils/query-params-utils";
import {
  QUERY_PAGE_NUMBER_NAME,
  QUERY_PAGE_SIZE_NAME,
} from "@/types/query-params";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export default function Pagination(props: PaginationProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const pageButtons = buildPageButtons(props.totalPages);

  function handleClick(pageNumber: string) {
    const params = new URLSearchParams(searchParams);
    if (isValidPageNumber(pageNumber)) {
      params.set(QUERY_PAGE_NUMBER_NAME, pageNumber);
    } else {
      params.delete(QUERY_PAGE_NUMBER_NAME);
    }

    if (isValidPageSize(props.pageSize.toString())) {
      params.set(QUERY_PAGE_SIZE_NAME, props.pageSize.toString());
    } else {
      params.delete(QUERY_PAGE_SIZE_NAME);
    }

    router.replace(`${pathName}?${params}`);
  }

  return (
    <div className="flex gap-2">
      {pageButtons.map((pageNumber) => {
        const isActive = pageNumber === props.currentPage;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => handleClick(pageNumber.toString())}
            className={`inline-flex rounded-lg px-4 py-2 transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-zinc-600 text-white hover:bg-zinc-700"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}

function buildPageButtons(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}
