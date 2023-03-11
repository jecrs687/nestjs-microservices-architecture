import { AvatarController } from '@api/user/avatar/avatar.controller';
import { UserController } from '@api/user/user.controller';
import { ImageClient } from '@infra/gateway/image/client';
import { Module } from '@nestjs/common';
import { AppController } from './api/health/app.controller';
import { AvatarModule } from './modules/avatar.module';
import { EventModule } from './modules/event.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [EventModule, AvatarModule, UserModule],
  controllers: [AppController, UserController, AvatarController],
  providers: [ImageClient],
})
export class AppModule {}
