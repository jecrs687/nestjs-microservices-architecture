import { HealthService } from '@domain/services/health.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUser } from './user.dto';
import zod, { z } from 'zod';
import { createUserSchema } from './user.schemas';
import { UserEntity } from '@domain/entities/user.entity';
@Controller('/api/user')
export class AppController {
  constructor(private readonly appService: HealthService) {}

  @Post()
  postUser(@Body() user: CreateUser): string {
    const userBody: z.infer<typeof createUserSchema> =
      createUserSchema.parse(user);
    return this.appService.getHealth();
  }

  @Get()
  getUser(): string {
    return this.appService.getHealth();
  }
}
