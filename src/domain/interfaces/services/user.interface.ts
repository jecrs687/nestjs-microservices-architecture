import { UserEntity } from '@domain/entities/user.entity';

export interface UserRepository {
  getUser: () => UserEntity;
  postUser: () => UserEntity;
}
export const UserRepository = Symbol('UserRepository');
