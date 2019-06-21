import { Module } from '@nestjs/common';
import { LXDService } from './lxd.service';
import { SourceImageFactory } from './factories';
import { AxiosProvider } from '../third-party/';

/**
 * The LXDModule, which bundles all
 * operational or processable LXD related
 * modules, controllers and components
 */
@Module({
  imports: [],
  providers: [LXDService, SourceImageFactory, AxiosProvider],
  exports: [LXDService]
})
export class LXDModule {}
