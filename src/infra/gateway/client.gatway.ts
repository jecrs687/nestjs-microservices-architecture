import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios';

type GetInstance = {
  instanceConfigs: CreateAxiosDefaults;
  clientConfigs: {
    hideHeaders: boolean;
  };
};
@Injectable({
  scope: Scope.TRANSIENT,
})
export class Client {
  constructor(@Inject(INQUIRER) private readonly inquirer: any) {}
  public getIntance({
    instanceConfigs,
    clientConfigs,
  }: GetInstance): AxiosInstance {
    const instance = axios.create(instanceConfigs);
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (clientConfigs.hideHeaders) delete error.config.headers;
        console.log({
          error: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
          parent: this.inquirer.constructor.name,
        });
        return error;
      },
    );
    return instance;
  }
}
