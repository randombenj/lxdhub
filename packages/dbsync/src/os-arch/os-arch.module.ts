import { Module } from '@nestjs/common';

import { OsArchService } from './os-arch.service';
import { OperatingSystemArchitectureRepository } from './os-arch.repository';
import { ArchitectureModule } from '../architecture';
import { ImageModule } from '../image';
import { LXDModule } from '../lxd';
import { OperatingSystemModule } from '../operating-system';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingSystemArchitecture } from '@lxdhub/db';

@Module({
    imports: [
        ImageModule,
        LXDModule,
        ArchitectureModule,
        OperatingSystemModule,
        TypeOrmModule.forFeature([OperatingSystemArchitecture, OperatingSystemArchitectureRepository])
    ],
    providers: [
        OsArchService,
    ],
    exports: [
        OsArchService
    ]
})
export class OperatingArchitectureModule { }
