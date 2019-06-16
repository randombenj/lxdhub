import { PaginationOptionsDto } from '.';

export type PaginationResponseData<ItemType extends any[]> = [ItemType, number];

/**
 * The response wrapper around the requested
 * data, which will be used as response,
 * when requesting a paginated list.
 */
export class PaginationResponseDto<ItemType extends any[]> {
    /**
     * The requested data
     */
    results: ItemType;
    /**
     * The offset of the items
     */
    offset: number;
    /**
     * The maximum amount of items to request
     */
    limit: number;
    /**
     * The total amount of all items in the
     * list, without the given offset and
     * limit options.
     */
    total: number;

    next?: string;

    previous?: string;
}
