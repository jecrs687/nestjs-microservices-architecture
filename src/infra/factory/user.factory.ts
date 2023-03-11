import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UserFactory {
  constructor() {}
  public create(user: Omit<UserEntity, 'id'>): UserEntity {
    const userDto: UserEntity = { id: `${randomUUID()}`, ...user };
    return userDto;
  }
  public createPartial(user: Partial<UserEntity>): UserEntity {
    const userDto: UserEntity = {
      id: `${randomUUID()}`,
      email: `${randomUUID()}`,
      first_name: `${randomUUID()}`,
      last_name: `${randomUUID()}`,
      avatar: `${randomUUID()}`,
      ...user,
    };
    return userDto;
  }
}
