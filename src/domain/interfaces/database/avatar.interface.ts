export abstract class AvatarRepository {
  abstract getUserAvatarHash: (userId: string) => Promise<string>;
  abstract deleteUserAvatar: (userId: string) => Promise<boolean>;
  abstract postUserAvatar: (userId: string, avatar: string) => Promise<void>;
}
