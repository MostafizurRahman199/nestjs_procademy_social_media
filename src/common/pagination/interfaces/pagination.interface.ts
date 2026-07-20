export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationLinks {
  first: string;
  previous: string;
  current: string;
  next: string;
  last: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}
