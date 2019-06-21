import { Global, Module } from '@nestjs/common';

import { FsProvider, PathProvider } from '.';
import { AxiosProvider } from './axios.provider';

@Module({
    providers: [
        FsProvider,
        PathProvider,
        AxiosProvider,
    ],
    exports: [
        FsProvider,
        PathProvider,
        AxiosProvider,
    ]
})
@Global()
export class ThirdPartyModule { }
