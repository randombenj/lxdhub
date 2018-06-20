import { DatabaseModule } from '@lxdhub/db';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule
  ],
})
/**
 * The Testing Module provides
 * Utility functions for easier testing
 */
export class TestingModule { }
