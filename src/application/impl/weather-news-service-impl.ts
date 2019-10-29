import { ScrapingService } from '../../domain/service/scraping-service';
import { ConverterService } from '../../domain/service/converter-service';
import { WeatherNewsService } from '../weather-news-service';
import { InformSlackService } from '../../domain/service/inform-slack-service';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';
import { WEATHER_FORECAST_AT_TOKYO } from '../../config/constant';
import 'reflect-metadata';
import { DATE, INDEX, TEMPERATURE, WeatherDate } from '../../domain/model/weather-forecast-model';

@injectable()
export class WeatherNewsServiceImpl implements WeatherNewsService {
  private weatherNewsUrl = WEATHER_FORECAST_AT_TOKYO;

  constructor(
    @inject(TYPES.ScrapingService)
    private readonly scrapingService: ScrapingService,
    @inject(TYPES.ConverterService)
    private readonly converterService: ConverterService,
    @inject(TYPES.InformSlackService)
    private readonly informSlackService: InformSlackService
  ) {
  }

  public async informTodayWeatherInfo() {
    const domData = await this.scrapingService.fetchDomData(
      this.weatherNewsUrl
    );
    // 指標取得
    const indexList: NodeListOf<Element> = domData.window.document.querySelectorAll(
      '.indexList_item'
    );
    const indexMap: Map<INDEX, string> = this.converterService.indexDomDataFormatter(indexList);
    // 天気取得
    const weatherList: NodeListOf<Element> = domData.window.document.querySelectorAll('.pict');
    // 日付取得
    const dateList: NodeListOf<Element> = domData.window.document.querySelectorAll('.tabView_item');
    const weatherDateMap: Map<DATE, WeatherDate> = this.converterService.weatherDomDataFormatter(weatherList, dateList);
    // 気温取得
    const temperatureList: NodeListOf<Element> = domData.window.document.querySelectorAll('.temp');
    const temperatureMap: Map<TEMPERATURE, string> = this.converterService.temperatureDomDataFormatter(temperatureList);

    const detailData = this.converterService.toDetailInformation(
      indexMap,
      weatherDateMap,
      temperatureMap
    );
    await this.informSlackService.informMessage(detailData.toString());
  }
}
