import { Module } from '@nestjs/common';
import { AliasService } from './';
import { LXDModule } from '../lxd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alias } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([Alias])
    ],
    providers: [
        AliasService,
    ],
    exports: [
        AliasService
    ]
})
export class AliasModule { }
