export interface WeatherNewsService {
  informTodayWeatherInfo(place: string): void;
  informTomorrowWeatherInfo(place: string): void;
}
