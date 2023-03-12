import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { UserFactory } from '@infra/factory/user.factory';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserMongo } from './entities/user.mongo';

@Injectable()
export class UserRepositoryMongo implements UserRepository {
  constructor(@InjectConnection('users') private connection: Connection) {}

  async getUser(id: string): Promise<UserEntity> {
    try {
      const user = await this.connection.models[UserMongo.name].findOne({ id });
      return user as unknown as UserEntity;
    } catch (e) {
      return undefined;
    }
  }
  async postUser(user: UserEntity): Promise<UserEntity> {
    const userDto = UserFactory.createPartial(user);
    const userDb = await this.connection.models[UserMongo.name].create(user);
    userDb.save();
    return userDto;
  }
  async removeAvatar(userId: string): Promise<boolean> {
    const user = await this.connection.get(userId);
    if (!user) return false;
    await this.connection.set(userId, { ...user, avatar: null });
    return true;
  }
}
