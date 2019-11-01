import { WeatherNewsService } from '../application/weather-news-service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify.types';
import { DATE } from '../domain/model/weather-forecast-model';

@injectable()
export class WeatherNews {
  constructor(
    @inject(TYPES.WeatherNewsService)
    private readonly weatherNewsService: WeatherNewsService
  ) {}

  /**
   * 天気予報を取得する
   * @param date 取得する日
   */
  public async informWeatherNews(date: DATE) {
    switch (date) {
      case DATE.TODAY:
        await this.weatherNewsService.informTodayWeatherInfo();
        return;
      case DATE.TOMORROW:
        await this.weatherNewsService.informTomorrowWeatherInfo();
        return;
      default:
        throw new Error(`${date} is invalid date.`);
    }
  }
}
