import { JSDOM } from 'jsdom';

export interface ScrapingService {
  /**
   * scrapingを行うサービス
   * @param url スクレイピングしてくるURL
   */
  fetchDomData(url: string): Promise<JSDOM>;
}
