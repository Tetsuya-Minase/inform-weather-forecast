import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import { WeatherNewsService } from './application/weather-news-service';
import { WeatherNewsServiceImpl } from './application/impl/weather-news-service-impl';
import { ConverterService } from './domain/service/converter-service';
import { ConverterServiceImpl } from './domain/service/impl/converter-service-impl';
import { InformSlackService } from './domain/service/inform-slack-service';
import { InformSlackServiceImpl } from './domain/service/impl/inform-slack-service-impl';
import { ScrapingService } from './domain/service/scraping-service';
import { ScrapingServiceImpl } from './domain/service/impl/scraping-service-impl';
import { HttpRequest } from './infrastructure/http-request';
import { HttpRequestImpl } from './infrastructure/impl/http-request-impl';
import { WeatherNews } from './interface/weather-news';

const container = new Container();
container
  .bind<WeatherNewsService>(TYPES.WeatherNewsService)
  .to(WeatherNewsServiceImpl)
  .inSingletonScope();
container
  .bind<ConverterService>(TYPES.ConverterService)
  .to(ConverterServiceImpl)
  .inSingletonScope();
container
  .bind<InformSlackService>(TYPES.InformSlackService)
  .to(InformSlackServiceImpl)
  .inSingletonScope();
container
  .bind<ScrapingService>(TYPES.ScrapingService)
  .to(ScrapingServiceImpl)
  .inSingletonScope();
container
  .bind<HttpRequest>(TYPES.HttpRequest)
  .to(HttpRequestImpl)
  .inSingletonScope();
container
  .bind<WeatherNews>(TYPES.WeatherNews)
  .to(WeatherNews)
  .inSingletonScope();

export { container };
