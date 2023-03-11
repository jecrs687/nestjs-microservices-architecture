import { ReqResClient } from '@domain/interfaces/gateway/reqres.interface';
import { UserFactory } from '@infra/factory/user.factory';
import { Injectable } from '@nestjs/common';
import { ENDPOINTS } from './endpoints';

@Injectable()
export class ReqResClientServiceMock implements ReqResClient {

  constructor() {}

  public endpoints = ENDPOINTS;

  public async get(url: string): Promise<any> {
    if(url.includes('users')) {
      if(url.includes('avatar')) return ""
      const user = UserFactory.createPartial({id: url.split('/').pop()});
      return  {data: user};
    }
  }
  public async post(url: string, body: any): Promise<any> {
    return {
      data: UserFactory.createPartial(body)
    }
  }
}
