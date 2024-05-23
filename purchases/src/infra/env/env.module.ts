import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { EnvService } from './env.service';

@Global()
@Module({
  providers: [EnvService],
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  exports: [EnvService],
})
export class EnvModule {}
