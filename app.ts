import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { container } from './src/inversify.config';
import { TYPES } from './src/inversify.types';
import { WeatherNews } from './src/interface/weather-news';

export const weatherForecast: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    container.get<WeatherNews>(TYPES.WeatherNews).informWeatherNews();
    return {
      statusCode: 204,
      body: ''
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: e,
          input: event
        },
        null,
        2
      )
    };
  }
};
