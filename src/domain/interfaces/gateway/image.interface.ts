export abstract class ImageClient {
  abstract getImageBase64: (url: string) => Promise<string>;
}
