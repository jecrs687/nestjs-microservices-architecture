import { AvatarController } from '@api/user/avatar/avatar.controller';
import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import { AvatarStorage } from '@domain/interfaces/storage/avatar.storage';
import { AvatarService } from '@domain/services/avatar.service';
import { AvatarRepositoryMemory } from '@infra/database/memory/avatar.database';
import { AvatarStorageMemory } from '@infra/storage/memory/Avatar.storage';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AvatarController],
  providers: [
    {
      provide: AvatarRepository,
      useClass: AvatarRepositoryMemory,
    },

    {
      provide: AvatarStorage,
      useClass: AvatarStorageMemory,
    },
    AvatarService,
  ],
})
export class AvatarModule {}
