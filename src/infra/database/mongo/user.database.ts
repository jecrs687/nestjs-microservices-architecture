import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { UserFactory } from '@infra/factory/user.factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserMongo } from './entities/user.mongo';

@Injectable()
export class UserRepositoryMongo implements UserRepository {
  constructor(
    @InjectModel(UserMongo.name, 'users')
    private userModel: Model<UserDocument>,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findOne({ id });
      return user as unknown as UserEntity;
    } catch (e) {
      return undefined;
    }
  }
  async postUser(user: UserEntity): Promise<UserEntity> {
    const userDto = UserFactory.createPartial(user);
    const userDb = await this.userModel.create(userDto);
    userDb.save();
    return userDb;
  }
  async removeAvatar(id: string): Promise<boolean> {
    const user = await this.userModel.findOne({ id });
    if (!user) throw new NotFoundException('user not found');
    await this.userModel.updateOne({ id }, { avatar: null });
    return true;
  }
}
