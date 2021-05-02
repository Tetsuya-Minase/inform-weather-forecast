import { Container } from 'inversify';
import { TYPES } from './inversify.types';
import { WeatherNewsService } from './application/weather-news-service';
import { WeatherNewsServiceImpl } from './application/impl/weather-news-service-impl';
import { ConverterService } from './domain/service/converter-service';
import { InformSlackService } from './domain/service/inform-slack-service';
import { ScrapingService } from './domain/service/scraping-service';
import { HttpRequest } from './infrastructure/http-request';
import { HttpRequestImpl } from './infrastructure/impl/http-request-impl';
import { WeatherNews } from './interface/weather-news';

const container = new Container({ defaultScope: 'Singleton' });
container.bind<WeatherNewsService>(TYPES.WeatherNewsService).to(WeatherNewsServiceImpl);
container.bind<ConverterService>(TYPES.ConverterService).to(ConverterService);
container.bind<InformSlackService>(TYPES.InformSlackService).to(InformSlackService);
container.bind<ScrapingService>(TYPES.ScrapingService).to(ScrapingService);
container.bind<HttpRequest>(TYPES.HttpRequest).to(HttpRequestImpl);
container.bind<WeatherNews>(TYPES.WeatherNews).to(WeatherNews);

export { container };
