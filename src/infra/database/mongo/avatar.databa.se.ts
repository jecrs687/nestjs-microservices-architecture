import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AvatarMongo } from './entities/avatar.mongo';
@Injectable()
export class AvatarRepositoryMongo implements AvatarRepository {
  constructor(@InjectConnection('avatars') private connection: Connection) {}
  avatar: [string, string][] = [];

  async getUserAvatarHash(userId: string): Promise<string> {
    try {
      const avatar = (await this.connection.models[AvatarMongo.name].findOne({
        userId,
      })) as unknown as { hash: string };
      if (!avatar?.hash) return null;
      return avatar.hash;
    } catch (e) {
      return null;
    }
  }
  async deleteUserAvatar(userId: string): Promise<boolean> {
    try {
      const avatar = (await this.connection.models[AvatarMongo.name].findOne({
        id: userId,
      })) as unknown as { hash: string };
      if (!avatar) return false;
      this.connection.models[AvatarMongo.name].deleteOne({
        id: userId,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async postUserAvatar(userId: string, hash: string): Promise<void> {
    const user = await this.connection.models[AvatarMongo.name].findOne({
      id: userId,
    });
    const avatarDto = await this.connection.models[AvatarMongo.name].create({
      userId,
      hash,
    });
    avatarDto.save();
    return;
  }
}
