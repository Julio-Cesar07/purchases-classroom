import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

@Resolver()
@UseGuards(AuthorizationGuard)
export class TestResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => String)
  hello() {
    return 'ok';
  }
}
