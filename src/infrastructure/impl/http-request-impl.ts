import { ResponseSuccess, RequestParams, ResponseError } from '../../domain/model/request-types';
import { HttpRequest } from '../http-request';
import { injectable } from 'inversify';
import axios from 'axios';

@injectable()
export class HttpRequestImpl implements HttpRequest {
  private header = { 'Content-Type': 'application/json' };

  public async get(url: string): Promise<ResponseSuccess> {
    const response = await axios.get<string>(url);
    if (response.status !== 200) {
      console.error('get error: ', response.data);
      throw new ResponseError(response.status, response.data, response.statusText);
    }
    return {
      status: response.status,
      data: response.data,
    };
  }

  public async post(param: RequestParams): Promise<ResponseSuccess> {
    if (param.url === '') {
      throw new ResponseError(400, param.url, 'BadRequest');
    }

    const response = await axios.post(param.url, param.data, {
      headers: this.header,
    });
    if (response.status !== 200) {
      console.error('post error:', response.data);
      throw new ResponseError(response.status, response.data, response.statusText);
    }
    return {
      status: response.status,
      data: response.data,
    };
  }
}
