import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  constructor() {}
  private users: UserEntity[] = [];

  async getUser(id: string): Promise<UserEntity> {
    return this.users.find((user) => user.id == id);
  }
  async postUser(user: UserEntity): Promise<UserEntity> {
    const userDto: UserEntity =  user;
    this.users.push(userDto);
    return userDto;
  }
  async removeAvatar(userId: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) return false;
    Object.assign(this.users[userIndex], { avatar: null });
    return true;
  }
}
