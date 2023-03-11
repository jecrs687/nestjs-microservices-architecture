import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ENDPOINTS } from './endpoints';

@Injectable()
export class ReqResClientService implements ReqResClient {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://reqres.in/api',
      timeout: 4000,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  public endpoints = ENDPOINTS;
  public axios: AxiosInstance;

  public async get(url: string): Promise<any> {
    return await this.axios.get(url);
  }
  public async post(url: string, body: any): Promise<any> {
    return await this.axios.post(url, body);
  }
}
