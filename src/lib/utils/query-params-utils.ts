import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  MIN_PAGE_NUMBER,
  MIN_PAGE_SIZE,
  MIN_TOTAL_PAGE,
  QueryParams,
} from "@/types/query-params";
import { isNumber } from "./utility";

export function isValidPageNumber(rawPageNumber?: string) {
  if (!rawPageNumber) return false;

  if (!isNumber(rawPageNumber)) return false;

  const pageNumber = Number(rawPageNumber);
  if (pageNumber < MIN_PAGE_NUMBER) return false;

  return true;
}

export function isValidPageSize(rawPageSize?: string) {
  if (!rawPageSize) return false;

  if (!isNumber(rawPageSize)) return false;

  const pageSize = Number(rawPageSize);
  if (pageSize < MIN_PAGE_SIZE) return false;

  return true;
}

export function getTotalPages(pageSize: number, itemCount: number) {
  return Math.max(MIN_TOTAL_PAGE, Math.ceil(itemCount / pageSize));
}

export function buildQueryParams(
  rawPageNumber?: string,
  rawPageSize?: string,
): QueryParams {
  const pageNumber = isValidPageNumber(rawPageNumber)
    ? Number(rawPageNumber)
    : DEFAULT_PAGE_NUMBER;
  const pageSize = isValidPageSize(rawPageSize)
    ? Number(rawPageSize)
    : DEFAULT_PAGE_SIZE;

  const queryParams: QueryParams = {
    pageNumber: pageNumber,
    pageSize: pageSize,
  };

  return queryParams;
}
