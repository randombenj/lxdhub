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
     * The name of the remote, from which the images should
     * be from.
     */
    @IsString()
    @Type(() => String)
    @ApiModelProperty()
    readonly remote: string;

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
