import { createContainer } from '../src/inversify.config';
import { TYPES } from '../src/inversify.types';
import { WeatherNews } from '../src/interface/weather-news';

describe('createContainer', () => {
  it('T18 should build WeatherNews without firebase', () => {
    // Given
    const config = { url: 'https://example.test/hook', mention: '' };
    // When
    const instance = createContainer(config).get<WeatherNews>(TYPES.WeatherNews);
    // Then
    expect(instance).toBeInstanceOf(WeatherNews);
  });
});
