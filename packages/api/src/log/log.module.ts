import { Image } from '@lxdhub/db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
