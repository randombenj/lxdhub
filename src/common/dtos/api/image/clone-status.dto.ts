import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

/**
 * The CloneStatusDto represents the data
 * transfer object, which is used for requesting
 * the status of a clone operation
 */
export class CloneStatusDto {
    @IsInt()
    @IsDefined()
    @Min(1)
    @Type(() => Number)
    /**
     * The id of the destination remote
     */
    destinationRemoteId: number;

    /**
     * The operation UUID from the LXD Server
     */
    @IsDefined()
    @Type(() => String)
    operation: string;

    @IsInt()
    @IsDefined()
    @Min(1)
    @Type(() => Number)
    /**
     * The id of the image
     */
    imageId: number;
}
