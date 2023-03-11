import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { Client } from '@infra/gateway/client.gatway';
import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { ENDPOINTS } from './endpoints';

@Injectable()
export class ReqResClientService implements ReqResClient {
  public axios: AxiosInstance;

  constructor(private readonly client: Client) {
    this.axios = client.getIntance({
      instanceConfigs: {
        baseURL: 'https://reqres.in/api',
        timeout: 4000,
        headers: { 'Content-Type': 'application/json' },
      },
      clientConfigs: {
        hideHeaders: false,
      },
    });
  }
  public endpoints = ENDPOINTS;

  public async get(url: string): Promise<any> {
    return await this.axios.get(url);
  }
  public async post(url: string, body: any): Promise<any> {
    return await this.axios.post(url, body);
  }
}
