export interface ImageClient {
  getImageBase64: (url: string) => Promise<string>;
}
export const ImageClient = Symbol('ImageClient');
