const PAGE_LIMIT = 10;
export class Util {
  getPageOptions(query: QueryOptions): QueryParameters {
    const pageOptions: QueryParameters = {
      offset: parseInt(query.offset, 10) || 0,
      limit: parseInt(query.limit, 10) || PAGE_LIMIT,
    };

    return pageOptions;
  }
}

export class QueryOptions {
  offset: string;
  limit: string;
}

export class QueryParameters {
  offset: number;
  limit: number;
}
