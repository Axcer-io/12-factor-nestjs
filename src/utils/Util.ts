const PAGE_LIMIT = 10;
export class Util {
  getPageOptions(query): Object {
    const pageOptions: Object = {
      offset: parseInt(query.offset, 10) || 0,
      limit: parseInt(query.limit, 10) || PAGE_LIMIT,
    };

    return pageOptions;
  }
}
