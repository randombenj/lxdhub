import { Module } from '@nestjs/common';

import { LXDModule } from '../lxd/lxd.module';
import { OperatingSystemService } from './operating-system.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingSystem } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([OperatingSystem])
    ],
    providers: [
        OperatingSystemService,
    ],
    exports: [
        OperatingSystemService
    ]
})
export class OperatingSystemModule { }
