import { Module } from '@nestjs/common';

import { RemoteFactory, RemoteService } from './';
import { LXDModule } from '../lxd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remote } from '@lxdhub/db';

@Module({
    imports: [
        LXDModule,
        TypeOrmModule.forFeature([Remote])
    ],
    providers: [
        RemoteFactory,
        RemoteService,
    ],
    exports: [
        RemoteService,
    ]
})
export class RemoteModule { }
