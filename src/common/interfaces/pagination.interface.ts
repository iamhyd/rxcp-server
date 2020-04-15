export interface PaginationResponseInterface<Entity> {
  results: Entity[];
  page: number;
  perPage: number;
  totalCount: number;
}

export interface PaginationRequestInterface {
  limit?: number;
  page?: number;
}
