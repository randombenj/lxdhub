import { PaginationResponseDto } from '@lxdhub/interfaces';

export type ImageListItemResponse = PaginationResponseDto<ImageListItemDto[]>;

/**
 * The data transfer object,
 * which represents a "not detailed"
 * image item. This class is used for
 * larger image lists, which do not require
 * any detailed data of an image.
 */
export class ImageListItemDto {
    id: number;
    fingerprint: string;
    uploadedAt: Date;
    description: string;
    _links: { detail: string };
}
