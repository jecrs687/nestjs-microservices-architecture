import { AxiosResponse } from 'axios';
import { ENDPOINTS } from './endpoints';
export abstract class ReqResClient {
  abstract get: (url: string) => Promise<AxiosResponse>;
  abstract post: (url: string, body: any) => Promise<AxiosResponse>;
  endpoints: typeof ENDPOINTS;
}
