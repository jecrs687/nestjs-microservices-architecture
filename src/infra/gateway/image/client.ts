import { ImageClient } from '@domain/interfaces/gateway/image.interface';
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { Client } from '../client.gatway';

@Injectable()
export class ImageClientService implements ImageClient {
  constructor(private readonly client: Client) {
    this.axios = this.client.getIntance({
      instanceConfigs: {
      timeout: 4000,
      headers: { 'Content-Type': 'application/json' }},
      clientConfigs: {
        hideHeaders: false,
      }
    });
  }
  public axios: AxiosInstance;

  public async getImageBase64(url: string): Promise<string> {
    const image = await this.axios.get(url, {
      responseType: 'arraybuffer',
    });

    const data = `data:${image.headers['content-type']};base64,${Buffer.from(
      image.data,
    ).toString('base64')}`;

    return data;
  }
}
