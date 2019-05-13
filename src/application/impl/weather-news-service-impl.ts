import { ScrapingService } from '../../domain/service/scraping-service';
import { ConverterServer } from '../../domain/service/converter-server';
import { WeatherNewsService } from '../weather-news-service';
import { InformSlackService } from '../../domain/service/inform-slack-service';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify.types';
import 'reflect-metadata';

@injectable()
export class WeatherNewsServiceImpl implements WeatherNewsService {
  private _scrapingService: ScrapingService;
  private _converterService: ConverterServer;
  private _informSlackService: InformSlackService;
  private weatherNewsUrl = 'https://weather.yahoo.co.jp/weather/13/4410.html';

  constructor(
    @inject(TYPES.ScrapingService) scrapingService: ScrapingService,
    @inject(TYPES.ConverterService) converterService: ConverterServer,
    @inject(TYPES.InformSlackService) informSlackService: InformSlackService
  ) {
    this._scrapingService = scrapingService;
    this._converterService = converterService;
    this._informSlackService = informSlackService;
  }

  public async informTodayWeatherInfo() {
    const domData = await this._scrapingService.fetchDomData(
      this.weatherNewsUrl
    );
    const indexList = domData.window.document.querySelectorAll(
      '.indexList_item'
    );
    const indexDataList: Array<
      Array<string>
    > = this._converterService.domDataFormatter(indexList);
    const pictList = domData.window.document.querySelectorAll('.pict');
    const pictDataList: Array<
      Array<string>
    > = this._converterService.domDataFormatter(pictList);
    const temperatureList = domData.window.document.querySelectorAll('.temp');
    const temperatureDataList: Array<
      Array<string>
    > = this._converterService.domDataFormatter(temperatureList);
    const timeList = domData.window.document.querySelectorAll('.time');
    const timeDataList: Array<
      Array<string>
    > = this._converterService.domDataFormatter(timeList);
    const precipList = domData.window.document.querySelectorAll('.precip');
    const precipDataList: Array<
      Array<string>
    > = this._converterService.domDataFormatter(precipList);
    const indexData = this._converterService.list2FullInformation(
      indexDataList,
      pictDataList,
      temperatureDataList
    );
    const detailData = this._converterService.list2TodayDetailInformation(
      indexDataList,
      pictDataList,
      temperatureDataList
    );
    const informMessage = `${detailData['date']}の天気\n天気：${
      detailData['weather']
    }\n最高気温：${detailData['maxTemperature']}/最低気温：${
      detailData['minTemperature']
    }\n洗濯：${detailData['washing']}\n傘：${detailData['umbrella']}\n紫外線：${
      detailData['uvLight']
    }\n重ね着：${detailData['layering']}\n熱中症：${
      detailData['heatstroke']
    }\nビール：${detailData['beer']}`;
    this._informSlackService.informMessage(informMessage);
  }
}
