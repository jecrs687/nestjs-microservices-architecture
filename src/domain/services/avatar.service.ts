import { ImageClient } from '@domain/interfaces/gateway/image.interface';
import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import { AvatarStorage } from '@domain/interfaces/storage/avatar.storage';
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserService } from './user.service';

@Injectable()
export class AvatarService {
  constructor(
    @Inject(AvatarRepository)
    private readonly avatarRepository: AvatarRepository,
    @Inject(AvatarStorage)
    private readonly file: AvatarStorage,
    private readonly userService: UserService,
    @Inject(ImageClient)
    private readonly imageClient: ImageClient,
  ) {}
  public async getUserAvatar(userId: string): Promise<string> {
    const hash = await this.avatarRepository.getUserAvatarHash(userId);
    if (!hash) {
      const client = await this.userService.getUser(userId);

      const data = await this.imageClient.getImageBase64(client.avatar);
      const hash = randomUUID();
      await this.avatarRepository.postUserAvatar(userId, hash);
      await this.file.saveImageOnBase64(hash, data);
      return data;
    }
    const image = await this.file.getImageOnBase64(hash);
    return image;
  }
  public async deleteUserAvatar(userId: string): Promise<boolean> {
    const userAvatar = await this.avatarRepository.deleteUserAvatar(userId);
    const user = await this.userService.removeAvatar(userId);
    return user && userAvatar;
  }
}
