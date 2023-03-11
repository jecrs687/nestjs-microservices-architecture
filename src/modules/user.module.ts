import { UserController } from '@api/user/user.controller';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { UserService } from '@domain/services/user.service';
import { UserRepositoryMemory } from '@infra/database/memory/user.database';
import { UserFactory } from '@infra/factory/user.factory';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
    UserService,
    UserFactory,
  ],
})
export class UserModule {}
