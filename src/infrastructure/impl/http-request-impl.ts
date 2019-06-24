import { get, post } from 'request';
import { RequestResponse } from '../../domain/model/request-response';
import { HttpRequest } from '../http-request';
import { injectable } from 'inversify';

@injectable()
export class HttpRequestImpl implements HttpRequest {
  public get(url: string): Promise<RequestResponse> {
    return new Promise<RequestResponse>((resolve, reject) => {
      get(url, (e, response, body) => {
        if (e) {
          console.error('get error:', e);
          reject({ error: e });
        }
        console.log('get success:', { response: response, body: body });
        resolve({ response: response, body: body });
      });
    });
  }

  public post(param: any): Promise<RequestResponse> {
    return new Promise<RequestResponse>((resolve, reject) => {
      post(param, (e, response, body) => {
        if (e) {
          console.error('post error:', e);
          reject({ error: e });
        }
        console.log('post success:', { response: response, body: body });
        resolve({ response: response, body: body });
      });
    });
  }
}
