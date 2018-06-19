import { Image } from '@lxdhub/db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LXDModule } from '../lxd';
import { SearchModule } from '../search/search.module';
import { ImageDetailFactory, ImageListItemFactory } from './factories';
import { ImageSearchDictionaryProvider } from './image-search-dictionary.const';
import { ImageController } from './image.controller';
import { ImageRepositoryProvider } from './image.repository';
import { ImageService } from './image.service';
import { RemoteModule } from '../remote';
import { ImageAvailabilityModule } from '../image-availability/';
import { ImageGateway } from './image.gateway';
import { LogModule } from '../log';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Image]),
    SearchModule,
    LXDModule,
    RemoteModule,
    ImageAvailabilityModule,
    LogModule
  ],
  controllers: [ImageController],
  components: [
    ImageService,
    ImageRepositoryProvider,
    ImageListItemFactory,
    ImageDetailFactory,
    ImageSearchDictionaryProvider,
    ImageGateway
  ]
})
/**
 * The Image module, which bundles all
 * operational or processable image related
 * modules, controllers and components
 */
export class ImageModule { }
