import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import { WeatherNewsService } from './application/weather-news-service';
import { WeatherNewsServiceImpl } from './application/impl/weather-news-service-impl';
import { ConverterServer } from './domain/service/converter-server';
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
  .to(WeatherNewsServiceImpl);
container
  .bind<ConverterServer>(TYPES.ConverterService)
  .to(ConverterServiceImpl);
container
  .bind<InformSlackService>(TYPES.InformSlackService)
  .to(InformSlackServiceImpl);
container.bind<ScrapingService>(TYPES.ScrapingService).to(ScrapingServiceImpl);
container.bind<HttpRequest>(TYPES.HttpRequest).to(HttpRequestImpl);
container.bind<WeatherNews>(TYPES.WeatherNews).to(WeatherNews);

export { container };
