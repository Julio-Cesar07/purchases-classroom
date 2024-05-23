import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

@Controller('test')
@UseGuards(AuthorizationGuard)
export class TestController {
  constructor(private prisma: PrismaService) {}

  @Get()
  handle() {
    return this.prisma.customer.findMany();
  }
}
