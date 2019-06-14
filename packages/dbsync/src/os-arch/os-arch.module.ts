import { Module } from '@nestjs/common';

import { OsArchService } from './os-arch.service';
import { ArchitectureModule } from '../architecture';
import { ImageModule } from '../image';
import { LXDModule } from '../lxd';
import { OperatingSystemModule } from '../operating-system';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image, OperatingSystemArchitecture } from '@lxdhub/db';

@Module({
    imports: [
        ImageModule,
        LXDModule,
        ArchitectureModule,
        OperatingSystemModule,
        TypeOrmModule.forFeature([OperatingSystemArchitecture, Image])
    ],
    providers: [
        OsArchService,
    ],
    exports: [
        OsArchService
    ]
})
export class OperatingArchitectureModule { }
