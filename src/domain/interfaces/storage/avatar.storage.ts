export interface AvatarStorage {
  saveImageOnBase64: (hashId: string, image: string) => Promise<string>;
  getImageOnBase64: (hashId: string) => Promise<string>;
  removeImage: (hashId: string) => Promise<void>;
}
export const AvatarStorage = Symbol('AvatarStorage');
