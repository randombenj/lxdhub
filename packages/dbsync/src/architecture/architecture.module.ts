import { Module } from '@nestjs/common';
import { ArchitectureService } from './architecture.service';
import { LXDModule } from '../lxd';
import { ArchitectureRepository } from './architecture.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Architecture } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([Architecture, ArchitectureRepository]),
    ],
    providers: [
        ArchitectureService
    ],
    exports: [
        ArchitectureService
    ]
})
export class ArchitectureModule { }
