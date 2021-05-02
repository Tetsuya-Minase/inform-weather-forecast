import { HttpRequest } from '../../infrastructure/http-request';
import { JSDOM } from 'jsdom';
import { ResponseError } from '../model/request-types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../inversify.types';
import axios from 'axios';

@injectable()
export class ScrapingService {
  constructor(@inject(TYPES.HttpRequest) private readonly httpRequest: HttpRequest) {}

  /**
   * scrapingを行うサービス
   * @param url スクレイピングしてくるURL
   */
  public async fetchDomData(url: string): Promise<JSDOM> {
    const response = await axios.get<string>(url);
    if (response.status !== 200) {
      console.error('scraping error: ', response.data);
      throw new ResponseError(response.status, response.data, response.statusText);
    }
    return new JSDOM(response.data);
  }
}
