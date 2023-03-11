import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { faker } from '@faker-js/faker';

@Injectable()
export class UserFactory {
  constructor() {}
  static createPartial(user?: Partial<UserEntity>): UserEntity {
    const userDto: UserEntity = {
      id: `${randomUUID()}`,
      email: `${faker.name.firstName()}@${faker.random.word()}.com`,
      first_name: `${faker.name.firstName()}`,
      last_name: `${faker.name.lastName()}`,
      avatar: `${faker.image.avatar()}`,
    };
    Object.assign(userDto, user)
    return userDto;
  }
}
