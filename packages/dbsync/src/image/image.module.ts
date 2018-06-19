import { Module, Global } from '@nestjs/common';

import { ImageService } from './image.service';
import { LXDModule } from '../lxd';
import { ImageDtoFactory } from './factories';
import { ImageRepositoryProvider } from './image.repository';

@Module({
    imports: [
        LXDModule
    ],
    components: [
        ImageRepositoryProvider,
        ImageService,
        ImageDtoFactory
    ],
    exports: [
        ImageService,
        ImageRepositoryProvider
    ]
})
@Global()
export class ImageModule { }
