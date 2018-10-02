import { Module } from '@nestjs/common';

import { LXDModule } from '../lxd/lxd.module';
import { OperatingSystemService } from './operating-system.service';
import { OperatingSystemRepository } from './operating-system.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingSystem } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([OperatingSystem, OperatingSystemRepository])
    ],
    providers: [
        OperatingSystemService,
    ],
    exports: [
        OperatingSystemService
    ]
})
export class OperatingSystemModule { }
