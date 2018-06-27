import { PaginationOptionsDto } from '.';

/**
 * The response wrapper around the requested
 * data, which will be used as response,
 * when requesting a paginated list.
 */
export class PaginationResponseDto<ItemType> {
    /**
     * Creates a new instance of a pagination response.
     * @param results The results of the query
     * @param total The total amount of items, without the applied pagination options
     * @param paginationOptions The given pagination options
     */
    constructor(results: ItemType, total: number, paginationOptions: PaginationOptionsDto) {
        this.offset = paginationOptions.offset;
        this.results = results;
        this.total = total;
        this.limit = paginationOptions.limit;
    }
    /**
     * The requested data
     */
    readonly results: ItemType;
    /**
     * The offset of the items
     */
    readonly offset: number;
    /**
     * The maximum amount of items to request
     */
    readonly limit: number;
    /**
     * The total amount of all items in the
     * list, without the given offset and
     * limit options.
     */
    readonly total: number;
}
