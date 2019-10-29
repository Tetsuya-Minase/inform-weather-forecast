import { WeatherNewsService } from "../application/weather-news-service";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify.types";

@injectable()
export class WeatherNews {
  constructor(
    @inject(TYPES.WeatherNewsService)
    private readonly weatherNewsService: WeatherNewsService
  ) {}

  public async informWeatherNews() {
    await this.weatherNewsService.informTodayWeatherInfo();
  }
}
