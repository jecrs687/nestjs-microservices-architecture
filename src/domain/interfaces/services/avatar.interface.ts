export interface AvatarRepository {
  getUserAvatarHash: (userId: string) => Promise<string>;
  deleteUserAvatar: (userId: string) => Promise<boolean>;
  postUserAvatar: (userId: string, avatar: string) => Promise<void>;
}
export const AvatarRepository = Symbol('AvatarRepository');
