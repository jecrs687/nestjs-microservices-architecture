import { AvatarRepository } from '@domain/interfaces/database/avatar.interface';
import { ImageClient } from '@domain/interfaces/gateway/image.interface';
import { AvatarStorage } from '@domain/interfaces/storage/avatar.storage';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserService } from './user.service';

@Injectable()
export class AvatarService {
  constructor(
    private readonly avatarRepository: AvatarRepository,
    private readonly file: AvatarStorage,
    private readonly userService: UserService,
    private readonly imageClient: ImageClient,
  ) {}
  public async getUserAvatar(userId: string): Promise<string> {
    const hash = await this.avatarRepository.getUserAvatarHash(userId);
    if (!hash) {
      const client = await this.userService.getUser(userId);
      if (client.avatar === null)
        throw new NotFoundException('Avatar not found');
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
    const userAvatar = await this.avatarRepository.getUserAvatarHash(userId);
    if (!userAvatar)
      throw new NotFoundException('User does not have an avatar');
    await this.avatarRepository.deleteUserAvatar(userId);
    const user = await this.userService.removeAvatar(userId);
    return user;
  }
}
