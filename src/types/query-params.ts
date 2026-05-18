export type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
};

export const QUERY_PAGE_NUMBER_NAME = "pageNumber";
export const QUERY_PAGE_SIZE_NAME = "pageSize";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MIN_TOTAL_PAGE = 1;
export const MIN_PAGE_NUMBER = 1;
export const MIN_PAGE_SIZE = 1;
