import {WeatherNewsService} from "../application/weather-news-service";
import {inject, injectable} from "inversify";
import {TYPES} from "../inversify.types";

@injectable()
export class WeatherNews{
    private _weatherNewsService: WeatherNewsService;

    constructor(
        @inject(TYPES.WeatherNewsService) weatherNewsService: WeatherNewsService
    ) {
        this._weatherNewsService = weatherNewsService;
    }

    public informWeatherNews() {
        this._weatherNewsService.informTodayWeatherInfo();
    }
}

