import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { container } from './src/inversify.config';
import { TYPES } from './src/inversify.types';
import { WeatherNews } from './src/interface/weather-news';
import { DATE } from './src/domain/model/weather-forecast-model';

export const weatherForecastToday: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    console.log('start');
    await container.get<WeatherNews>(TYPES.WeatherNews).informWeatherNews(DATE.TODAY);
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

export const weatherForecastTomorrow: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    console.log('start');
    await container.get<WeatherNews>(TYPES.WeatherNews).informWeatherNews(DATE.TOMORROW);
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
