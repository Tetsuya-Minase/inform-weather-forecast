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
    console.log('start');
    await container.get<WeatherNews>(TYPES.WeatherNews).informWeatherNews();
    console.log('end');
    return {
      statusCode: 204,
      body: ''
    };
  } catch (e) {
    console.log('error end:', e);
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
