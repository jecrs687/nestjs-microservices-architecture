import { UserEntity } from '@domain/entities/user.entity';

export abstract class UserRepository {
  abstract getUser: (id: string) => Promise<UserEntity | undefined>;
  abstract postUser: (user: Omit<UserEntity, 'id'>) => Promise<UserEntity>;
  abstract removeAvatar: (userId: string) => Promise<boolean>;
}
