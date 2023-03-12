import { TransformInterceptor } from '@decoratos/interceptor.decorator';
import { UserEntity } from '@domain/entities/user.entity';
import { UserService } from '@domain/services/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { z } from 'zod';
import { CreateUser } from './user.dto';
import { createUserSchema } from './user.schemas';
@UseInterceptors(TransformInterceptor)
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  postUser(@Body() user: CreateUser): Promise<UserEntity> {
    const userBody: z.infer<typeof createUserSchema> =
      createUserSchema.parse(user);

    return this.userService.postUser(userBody as Omit<UserEntity, 'id'>);
  }

  @Get(':id')
  getUser(@Param() params): Promise<UserEntity> {
    return this.userService.getUser(params.id);
  }
}
