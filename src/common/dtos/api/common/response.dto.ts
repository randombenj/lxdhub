import { ApiModelProperty } from '@nestjs/swagger';

/**
 * The response wrapper around the requested
 * data, which will be used as response,
 * when requesting a paginated list.
 */
export class ResponseDto<ItemType> {
    /**
     * Creates a new instance of a response.
     * @param results The results of the query
     */
    constructor(results: ItemType) {
        this.results = results;
    }

    /**
     * The requested data
     */
    @ApiModelProperty({ description: 'The results of the response' })
    readonly results: ItemType;
}
