"use client";

import { isNumber } from "@/lib/utils/utility";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination(props: PaginationProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  function handleClick(pageNumber: string) {
    const params = new URLSearchParams(searchParams);
    if (isNumber(pageNumber)) {
      params.set("pageNumber", pageNumber);
    } else {
      params.delete("pageNumber");
    }

    router.replace(`${pathName}?${params}`);
  }

  return (
    <div>
      <div
        onClick={() => handleClick("1")}
        className="px-4 py-4 mx-2 bg-zinc-600 inline-flex rounded-lg"
      >
        1
      </div>
      <div
        onClick={() => handleClick("2")}
        className="px-4 py-4 mx-2 bg-zinc-600 inline-flex rounded-lg"
      >
        2
      </div>
      <div
        onClick={() => handleClick("3")}
        className="px-4 py-4 mx-2 bg-zinc-600 inline-flex rounded-lg"
      >
        3
      </div>
    </div>
  );
}

function buildPageButtons(totalPages: number) {}
