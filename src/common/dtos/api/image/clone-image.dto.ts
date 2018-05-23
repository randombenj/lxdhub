import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * The CloneImageDto represents the data
 * transfer object, which is used for defining
 * the options to clone an image
 */
export class CloneImageDto {
    @IsInt()
    @IsDefined()
    @Min(1)
    @Type(() => Number)
    @ApiModelProperty()
    /**
     * The id of the source remote
     */
    sourceRemoteId: number;

    @IsInt()
    @IsDefined()
    @Min(1)
    @Type(() => Number)
    @ApiModelProperty()
    /**
     * The id of the destination remote
     */
    destinationRemoteId: number;
}
