import { container } from './inversify.config';
import { TYPES } from './inversify.types';
import { WeatherNews } from './interface/weather-news';

const weatherNews = container.get<WeatherNews>(TYPES.WeatherNews);
weatherNews.informWeatherNews();
