import { UserEntity } from '@domain/entities/user.entity';

export interface AvatarRepository {
  getUserAvatar: () => UserEntity;
  deleteUserAvatar: () => UserEntity;
}
export const AvatarRepository = Symbol('AvatarRepository');
