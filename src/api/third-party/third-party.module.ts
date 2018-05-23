import { Global, Module } from '@nestjs/common';

import { FsProvider, PathProvider, RequestProvider } from '.';

@Module({
    components: [
        FsProvider,
        PathProvider,
        RequestProvider
    ],
    exports: [
        FsProvider,
        PathProvider,
        RequestProvider
    ]
})
@Global()
export class ThirdPartyModule { }
