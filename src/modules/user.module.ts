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
import { AvatarRepositoryMongo } from '@infra/database/mongo/avatar.databa.se';
import {
  AvatarMongo,
  AvatarSchema,
} from '@infra/database/mongo/entities/avatar.mongo';
import {
  UserMongo,
  UserSchema,
} from '@infra/database/mongo/entities/user.mongo';
import { UserRepositoryMongo } from '@infra/database/mongo/user.database';
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
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
const isTest = process.env.NODE_ENV == 'test';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://root:root@localhost:27017', {
      connectionName: 'users',
      dbName: 'users',
      connectionFactory: (connection: Connection) => {
        connection.model(UserMongo.name, UserSchema);
        return connection;
      },
    }),
    MongooseModule.forRoot('mongodb://root:root@127.0.0.1:27017', {
      connectionName: 'avatars',
      dbName: 'avatars',
      connectionFactory: (connection: Connection) => {
        connection.model(AvatarMongo.name, AvatarSchema);
        return connection;
      },
    }),
  ],
  controllers: [UserController, AvatarController],
  providers: [
    HealthService,
    {
      provide: Health,
      useClass: HealthResponse,
    },
    {
      provide: UserRepository,
      useClass: isTest ? UserRepositoryMemory : UserRepositoryMongo,
    },
    {
      provide: ReqResClient,
      useClass: isTest ? ReqResClientServiceMock : ReqResClientService,
    },
    {
      provide: AvatarRepository,
      useClass: isTest ? AvatarRepositoryMemory : AvatarRepositoryMongo,
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
      useClass: isTest ? ImageClientServiceMock : ImageClientService,
    },

    Client,
    UserService,
    AvatarService,
    UserFactory,
  ],
})
export class UserModule {}
