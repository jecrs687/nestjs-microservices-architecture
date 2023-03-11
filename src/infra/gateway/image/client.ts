import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ImageClient {
  constructor() {
    this.axios = axios.create({
      timeout: 4000,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public axios: AxiosInstance;

  public async get(url: string): Promise<any> {
    const image = await this.axios.get(url, {
      responseType: 'arraybuffer',
    });

    const data = `data:${image.headers['content-type']};base64,${Buffer.from(
      image.data,
    ).toString('base64')}`;

    return data;
  }
}
