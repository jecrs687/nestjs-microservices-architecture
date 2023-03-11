import { UserEntity } from '@domain/entities/user.entity';

export interface UserRepository {
  getUser: (id: string) => Promise<UserEntity | undefined>;
  postUser: (user: Omit<UserEntity, 'id'>) => Promise<UserEntity>;
  removeAvatar: (userId: string) => Promise<boolean>;
}
export const UserRepository = Symbol('UserRepository');
