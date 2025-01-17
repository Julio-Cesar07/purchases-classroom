import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandler } from './core/errors/handler-error-http';
import { EnvService } from './infra/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ErrorHandler());

  const env = app.get(EnvService);
  const port = env.get('PORT');

  await app.listen(port);
}
bootstrap();
