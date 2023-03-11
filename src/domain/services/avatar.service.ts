import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { AvatarStorage } from '@domain/interfaces/storage/avatar.storage';
import { ImageClient } from '@infra/gateway/image/client';
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserService } from './user.service';

@Injectable()
export class AvatarService {
  constructor(
    @Inject(AvatarRepository)
    private readonly avatarRepository: AvatarRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(AvatarStorage)
    private readonly file: AvatarStorage,
    private readonly userService: UserService,
    private readonly imageClient: ImageClient,
  ) {}
  public async getUserAvatar(userId: string): Promise<string> {
    const hash = await this.avatarRepository.getUserAvatarHash(userId);
    if (!hash) {
      const client = await this.userService.getUser(userId);
      const data = await this.imageClient.get(client.avatar);
      const hash = randomUUID();
      await this.avatarRepository.postUserAvatar(userId, hash);
      await this.file.saveImageOnBase64(hash, data);
      return data;
    }
    const image = await this.file.getImageOnBase64(hash);
    return image;
  }
  public async deleteUserAvatar(userId: string): Promise<boolean> {
    const user = await this.avatarRepository.deleteUserAvatar(userId);
    return user;
  }
}
