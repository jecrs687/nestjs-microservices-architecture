export abstract class AvatarStorage {
  abstract saveImageOnBase64: (
    hashId: string,
    image: string,
  ) => Promise<string>;
  abstract getImageOnBase64: (hashId: string) => Promise<string>;
  abstract removeImage: (hashId: string) => Promise<void>;
}
