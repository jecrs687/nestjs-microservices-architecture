import { AvatarRepository } from '@domain/interfaces/services/avatar.interface';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
      if (!avatar) return null;
      return avatar.hash;
    } catch (e) {
      return null;
    }
  }
  async deleteUserAvatar(userId: string): Promise<boolean> {
    try {
      const avatar = await this.avatarModel.findOne({
        userId,
      });
      if (!avatar) throw new NotFoundException('User does not have an avatar');
      await this.avatarModel.deleteOne({
        userId,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async postUserAvatar(userId: string, hash: string): Promise<void> {
    const user = await this.avatarModel.findOne({
      userId,
    });
    if (user) {
      throw new UnprocessableEntityException('User already has an avatar');
    }
    const avatarDto = await this.avatarModel.create({
      userId,
      hash,
    });
    avatarDto.save();
    return;
  }
}
