import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { PaginationOptionsDto } from '../../common';

/**
 * This interface represents
 * options for request an image list.
 */
export class ImageListOptions extends PaginationOptionsDto {
    /**
     * The id of the remote, from which the images should
     * be from. If none is given, take the first remote
     */
    @IsInt()
    @Min(1)
    @Type(() => Number)
    @ApiModelProperty()
    readonly remoteId: number;

    /**
     * The query-string which filters the image.
     * Search for image OS name or Arch Name
     */
    @IsString()
    @Type(() => String)
    @IsOptional()
    @ApiModelPropertyOptional()
    readonly query?: string;
}
