import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';

@Global()
@Module({
  imports: [DatabaseModule, EnvModule],
  exports: [DatabaseModule, EnvModule],
})
export class GlobalModule {}
