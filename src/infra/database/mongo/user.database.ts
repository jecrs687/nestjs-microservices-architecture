import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class UserRepositoryMongo implements UserRepository {
  constructor(
        @InjectConnection('users') private connection: Connection,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
        return await this.connection.get(id);
  }
  async postUser(user: UserEntity): Promise<UserEntity> {
        return await this.connection.set(user.id, user);
  }
  async removeAvatar(userId: string): Promise<boolean> {
        const user =  await this.connection.get(userId);
        if (user) return false;
        await this.connection.set(userId, { ...user, avatar: null });
        return true;
  }
}
