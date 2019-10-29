import { JSDOM } from "jsdom";

export interface ScrapingService {
  fetchDomData(url: string): Promise<JSDOM>;
}
