import { UserEntity } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/interfaces/services/user.interface';
import { UserFactory } from '@infra/factory/user.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryMemory implements UserRepository {
  constructor(private readonly userFactory: UserFactory) {}
  private users: UserEntity[] = [];

  async getUser(id: string): Promise<UserEntity> {
    return this.users.find((user) => user.id == id);
  }
  async postUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const userDto: UserEntity = this.userFactory.create(user);
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
