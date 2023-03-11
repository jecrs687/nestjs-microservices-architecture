import { AvatarController } from '@api/user/avatar/avatar.controller';
import { UserController } from '@api/user/user.controller';
import { EmailSender } from '@domain/interfaces/events/emails.interface';
import { RabbitMq } from '@domain/interfaces/events/rabbitMq.interface';
import { ImageClient } from '@domain/interfaces/gateway/image.interface';
import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import { Health } from '@domain/interfaces/services/health.interface';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { AvatarStorage } from '@domain/interfaces/storage/avatar.storage';
import { AvatarService } from '@domain/services/avatar.service';
import { HealthService } from '@domain/services/health.service';
import { UserService } from '@domain/services/user.service';
import { AvatarRepositoryMemory } from '@infra/database/memory/avatar.database';
import { UserRepositoryMemory } from '@infra/database/memory/user.database';
import { RabbitMqService } from '@infra/events/rabbitMq.events';
import { SendEmailService } from '@infra/events/sendEmail.evemts';
import { UserFactory } from '@infra/factory/user.factory';
import { Client } from '@infra/gateway/client.gatway';
import { ImageClientService } from '@infra/gateway/image/client';
import { ImageClientServiceMock } from '@infra/gateway/image/client.mock';
import { ReqResClientService } from '@infra/gateway/reqres/client';
import { ReqResClientServiceMock } from '@infra/gateway/reqres/client.mock';
import { HealthResponse } from '@infra/health/health.response';
import { AvatarStorageMemory } from '@infra/storage/memory/Avatar.storage';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const isTest = process.env.NODE_ENV == 'test';
@Module({
  imports: [ConfigModule],
  controllers: [UserController, AvatarController],
  providers: [
    HealthService,
    {
      provide: Health,
      useClass: HealthResponse,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryMemory,
    },
    {
      provide: ReqResClient,
      useClass: isTest? ReqResClientServiceMock: ReqResClientService,
    },
    {
      provide: AvatarRepository,
      useClass: AvatarRepositoryMemory,
    },
    {
      provide: EmailSender,
      useClass: SendEmailService,
    },
    {
      provide: RabbitMq,
      useClass: RabbitMqService,
    },
    {
      provide: AvatarStorage,
      useClass: AvatarStorageMemory,
    },
    {
      provide: ImageClient,
      useClass: isTest? ImageClientServiceMock: ImageClientService,
    },
    Client,
    UserService,
    AvatarService,
    UserFactory,
  ],
})
export class UserModule {}
