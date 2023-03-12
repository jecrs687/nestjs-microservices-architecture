import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvatarDocument, AvatarMongo } from './entities/avatar.mongo';
@Injectable()
export class AvatarRepositoryMongo implements AvatarRepository {
  constructor(
    @InjectModel(AvatarMongo.name, 'avatars')
    private avatarModel: Model<AvatarDocument>,
  ) {}
  avatar: [string, string][] = [];

  async getUserAvatarHash(userId: string): Promise<string> {
    try {
      const avatar = await this.avatarModel.findOne({
        userId,
      });
      if (!avatar) return undefined;
      return avatar.hash;
    } catch (e) {
      return undefined;
    }
  }
  async deleteUserAvatar(userId: string): Promise<boolean> {
    try {
      await this.avatarModel.deleteOne({
        userId,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async postUserAvatar(userId: string, hash: string): Promise<void> {
    const avatarDto = await this.avatarModel.create({
      userId,
      hash,
    });
    avatarDto.save();
    return;
  }
}
