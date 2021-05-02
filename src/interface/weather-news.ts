import { WeatherNewsService } from '../application/weather-news-service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../inversify.types';
import { DATE } from '../domain/model/weather-forecast-model';
import { WEATHER_FORECAST_PLACE } from '../config/constant';

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
        await this.weatherNewsService.informTodayWeatherInfo(WEATHER_FORECAST_PLACE);
        return;
      case DATE.TOMORROW:
        await this.weatherNewsService.informTomorrowWeatherInfo(WEATHER_FORECAST_PLACE);
        return;
      default:
        throw new Error(`${date} is invalid date.`);
    }
  }
}
