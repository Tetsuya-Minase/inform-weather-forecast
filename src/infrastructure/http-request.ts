import { RequestResponse } from '../domain/model/request-response';

export interface HttpRequest {
  get(url: string): Promise<RequestResponse>;
  post(param: any): Promise<RequestResponse>;
}
