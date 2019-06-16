import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import {
  CloneImageDto,
  CloneImageResponseDto,
  ImageDetailDto,
  ImageListOptions,
  ImageListItemResponse
} from '.';
import { ResponseDto } from '@lxdhub/interfaces';
import { ImageService } from './image.service';
import { TransformInterceptor, PaginationResponseData, PaginationInterceptor } from '../common';
import { ImageListItemDto } from './dtos';
import { Image } from '@lxdhub/db';

/**
 * The Image Controller, which is the API
 * interface for Image-Operations.
 */
@Controller('/api/v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /**
   * Returns images, limited by the given pagination options and
   * filters it by the given remoteId.
   * If remoteId is not given, it takes the first remote.
   * @param options The options to paginate through the requested data
   */
  @Get('/')
  @UseInterceptors(new PaginationInterceptor(ImageListItemDto))
  @ApiResponse({
    status: 200,
    description: 'The images have been successfully requested'
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Remote not found' })
  async findByRemote(
    @Query(new ValidationPipe({ transform: true }))
    options: ImageListOptions
  ): Promise<PaginationResponseData<Image[]>> {
    try {
      // Fetches the images
      return await this.imageService.findByRemote(
        options.remote,
        options,
        options.query ? options.query.trim() : null
      );
    } catch (err) {
      if (err instanceof TypeError) {
        // Is a search query error
        throw new BadRequestException(err.message);
      } else if (err instanceof NotFoundException) {
        // Not found
        throw err;
      } else {
        // Unknwon error. Should not occur
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  /**
   * Returns a detail image with the given id
   * @param {number} fingerprint The fingerprint of the image
   */
  @Get('/:fingerprint')
  @ApiResponse({
    status: 200,
    description: 'The image have been successfully requested'
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findOne(
    @Param('fingerprint')
    fingerprint: string
  ): Promise<ResponseDto<ImageDetailDto>> {
    return await this.imageService.findOne(fingerprint);
  }

  /**
   * Clones the image with the given id
   * @param {number} id The id of the image
   */
  @Post('/:id/clone')
  @ApiResponse({
    status: 200,
    description: 'The image have been successfully cloned'
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 403, description: 'Not Authorized' })
  @ApiResponse({
    status: 500,
    description: 'The destination LXD remote is not reachable'
  })
  async clone(
    // Convert id to an integer
    @Param('id', new ParseIntPipe())
    id: number,
    @Body()
    cloneImageDto: CloneImageDto
  ): Promise<ResponseDto<CloneImageResponseDto>> {
    return await this.imageService.cloneImage(id, cloneImageDto);
  }
}
