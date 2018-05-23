import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

/**
 * This interface represents
 * options for iterating through
 * paginated lists.
 */
export class PaginationOptionsDto {
    /**
     * The maximum amount of items to request.
     */
    @IsInt()
    @Min(1)
    @Max(200)
    @IsOptional()
    @Type(() => Number)
    readonly limit: number = 20;

    /**
     * The offset of the items
     */
    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    readonly offset: number = 0;
}
