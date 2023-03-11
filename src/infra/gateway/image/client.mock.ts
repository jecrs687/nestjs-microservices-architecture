import { ImageClient } from '@domain/interfaces/gateway/image.interface';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageClientServiceMock implements ImageClient {
  constructor() {}

  public async getImageBase64(url: string): Promise<any> {
    const image = faker.image.imageUrl();
    return image;
  }
}
