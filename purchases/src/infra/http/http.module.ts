import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { TestController } from './test.controller';
import { TestResolver } from './test.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (err) => {
        return {
          message: err.message,
          path: err.path,
          locations: err.locations,
          code: err.extensions ? err.extensions.code : 500,
        };
      },
    }),
  ],
  controllers: [TestController],
  providers: [TestResolver],
})
export class HttpModule {}
