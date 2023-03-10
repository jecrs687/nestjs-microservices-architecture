import { UserEntity } from '@domain/entities/user.entity';

export interface AvatarRepository {
  createEvent: () => UserEntity;
  deleteUserAvatar: () => UserEntity;
}
export const AvatarRepository = Symbol('AvatarRepository');
