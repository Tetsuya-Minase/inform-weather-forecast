import { ScrapingService } from '../../domain/service/scraping-service';
import { ConverterService } from '../../domain/service/converter-service';
import { WeatherNewsService } from '../weather-news-service';
import { InformService } from '../../domain/service/inform-service';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';
import 'reflect-metadata';
import { DATE, INDEX, TEMPERATURE, WeatherDate } from '../../domain/model/weather-forecast-model';

@injectable()
export class WeatherNewsServiceImpl implements WeatherNewsService {
  constructor(
    @inject(TYPES.ScrapingService)
    private readonly scrapingService: ScrapingService,
    @inject(TYPES.ConverterService)
    private readonly converterService: ConverterService,
    @inject(TYPES.InformService)
    private readonly informSlackService: InformService
  ) {}

  /**
   * 今日の天気を取得する
   * @param place 取得する場所
   */
  public async informTodayWeatherInfo(place: string): Promise<void> {
    const domData = await this.scrapingService.fetchDomData(place);
    // 指標取得
    const indexList: NodeListOf<Element> = domData.window.document.querySelectorAll('.indexList_item');
    const indexMap: Map<INDEX, string> = this.converterService.indexDomDataFormatter(indexList, DATE.TODAY);
    // 天気取得
    const weatherList: NodeListOf<Element> = domData.window.document.querySelectorAll('.pict');
    // 日付取得
    const dateList: NodeListOf<Element> = domData.window.document.querySelectorAll('.tabView_item');
    const weatherDateMap: Map<DATE, WeatherDate> = this.converterService.weatherDomDataFormatter(weatherList, dateList);
    // 気温取得
    const temperatureList: NodeListOf<Element> = domData.window.document.querySelectorAll('.temp');
    const temperatureMap: Map<TEMPERATURE, string> = this.converterService.temperatureDomDataFormatter(
      temperatureList,
      DATE.TODAY
    );

    const { date, notificationData } = this.converterService.toDetailInformation(
      indexMap,
      weatherDateMap,
      temperatureMap,
      DATE.TODAY,
      place
    );
    await this.informSlackService.informMessage(date, notificationData);
  }

  /**
   * 明日の天気を取得する
   * @param place 取得する場所
   */
  public async informTomorrowWeatherInfo(place: string): Promise<void> {
    const domData = await this.scrapingService.fetchDomData(place);
    // 指標取得
    const indexList: NodeListOf<Element> = domData.window.document.querySelectorAll('.indexList_item');
    const indexMap: Map<INDEX, string> = this.converterService.indexDomDataFormatter(indexList, DATE.TOMORROW);
    // 天気取得
    const weatherList: NodeListOf<Element> = domData.window.document.querySelectorAll('.pict');
    // 日付取得
    const dateList: NodeListOf<Element> = domData.window.document.querySelectorAll('.tabView_item');
    const weatherDateMap: Map<DATE, WeatherDate> = this.converterService.weatherDomDataFormatter(weatherList, dateList);
    // 気温取得
    const temperatureList: NodeListOf<Element> = domData.window.document.querySelectorAll('.temp');
    const temperatureMap: Map<TEMPERATURE, string> = this.converterService.temperatureDomDataFormatter(
      temperatureList,
      DATE.TOMORROW
    );

    const { date, notificationData } = this.converterService.toDetailInformation(
      indexMap,
      weatherDateMap,
      temperatureMap,
      DATE.TOMORROW,
      place
    );
    await this.informSlackService.informMessage(date, notificationData);
  }
}
