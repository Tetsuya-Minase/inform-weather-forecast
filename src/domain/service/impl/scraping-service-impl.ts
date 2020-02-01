import { HttpRequest } from '../../../infrastructure/http-request';
import { JSDOM } from 'jsdom';
import { ResponseError } from '../../model/request-types';
import { ScrapingService } from '../scraping-service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../../inversify.types';
import axios from 'axios';

@injectable()
export class ScrapingServiceImpl implements ScrapingService {
  constructor(@inject(TYPES.HttpRequest) private readonly httpRequest: HttpRequest) {}

  public async fetchDomData(url: string): Promise<JSDOM> {
    const response = await axios.get<string>(url);
    if (response.status !== 200) {
      console.error('scraping error: ', response.data);
      throw new ResponseError(response.status, response.data, response.statusText);
    }
    return new JSDOM(response.data);
  }
}
