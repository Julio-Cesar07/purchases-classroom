import { Module } from '@nestjs/common';
import { GlobalModule } from './infra/global.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [GlobalModule, HttpModule],
})
export class AppModule {}
