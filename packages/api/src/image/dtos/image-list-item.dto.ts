import { PaginationResponseDto } from '@lxdhub/interfaces';
import { Exclude, Expose } from 'class-transformer';

export type ImageListItemResponse = PaginationResponseDto<ImageListItemDto[]>;

/**
 * The data transfer object,
 * which represents a 'not detailed'
 * image item. This class is used for
 * larger image lists, which do not require
 * any detailed data of an image.
 */
@Exclude()
export class ImageListItemDto {
  @Expose()
  id: number;
  @Expose()
  fingerprint: string;
  @Expose()
  uploadedAt: Date;
  @Expose()
  description: string;
  @Expose()
  _links: { detail: string };
}
