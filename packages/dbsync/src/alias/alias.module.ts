import { Module } from '@nestjs/common';
import { AliasService } from './';
import { AliasRepository } from './alias.repository';
import { LXDModule } from '../lxd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alias } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([Alias, AliasRepository])
    ],
    providers: [
        AliasService,
    ],
    exports: [
        AliasService
    ]
})
export class AliasModule { }
