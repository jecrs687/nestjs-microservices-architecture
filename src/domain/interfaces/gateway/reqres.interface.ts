import { AxiosResponse } from 'axios';
import { ENDPOINTS } from './endpoints';
export interface ReqResClient {
  get: (url: string) => Promise<AxiosResponse>;
  post: (url: string, body: any) => Promise<AxiosResponse>;
  endpoints: typeof ENDPOINTS;
}
export const ReqResClient = Symbol('ReqResClient');
