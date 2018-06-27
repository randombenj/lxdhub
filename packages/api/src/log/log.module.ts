import { Module } from '@nestjs/common';

import { LogController } from './log.controller';

@Module({
  controllers: [LogController],
})
/**
 * The log module, which bundles all
 * operational or processable log related
 * modules, controllers and components
 */
export class LogModule { }
