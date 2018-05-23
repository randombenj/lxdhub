import { Module } from '@nestjs/common';

import { LXDModule } from '../lxd/lxd.module';
import { OperatingSystemService } from './operating-system.service';
import { OperatingSystemRepositoryProvider } from './operating-system.repository';

@Module({
    imports: [
        LXDModule
    ],
    components: [
        OperatingSystemService,
        OperatingSystemRepositoryProvider
    ],
    exports: [
        OperatingSystemService
    ]
})
export class OperatingSystemModule { }
