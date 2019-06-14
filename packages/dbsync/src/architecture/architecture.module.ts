import { Module } from '@nestjs/common';
import { ArchitectureService } from './architecture.service';
import { LXDModule } from '../lxd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Architecture } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([Architecture]),
    ],
    providers: [
        ArchitectureService
    ],
    exports: [
        ArchitectureService
    ]
})
export class ArchitectureModule { }
