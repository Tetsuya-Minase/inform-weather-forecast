import { run, Deps } from '../main';
import { DATE } from '../src/domain/model/weather-forecast-model';

describe('run', () => {
  let informWeatherNews: jest.Mock;
  let deps: Deps;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    informWeatherNews = jest.fn().mockResolvedValue(undefined);
    deps = { createWeatherNews: jest.fn().mockReturnValue({ informWeatherNews }) };
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('T14 should inform the target day and return 0', async () => {
    // Given
    const env = { DISCORD_URL: 'https://example.test/hook' };
    // When
    const code = await run(['tomorrow'], env, deps);
    // Then
    expect(informWeatherNews).toHaveBeenCalledTimes(1);
    expect(informWeatherNews).toHaveBeenCalledWith(DATE.TOMORROW);
    expect(code).toBe(0);
  });

  it('T15 should return 1 and log the error when informing fails', async () => {
    // Given
    const error = new Error('scraping error');
    informWeatherNews.mockRejectedValue(error);
    const env = { DISCORD_URL: 'https://example.test/hook' };
    // When
    const code = await run(['today'], env, deps);
    // Then
    expect(code).toBe(1);
    expect(errorSpy).toHaveBeenCalledWith(expect.any(String), error);
  });

  it('T16 should return 1 without informing when arg is invalid', async () => {
    // Given
    const env = { DISCORD_URL: 'https://example.test/hook' };
    // When
    const code = await run(['yesterday'], env, deps);
    // Then
    expect(code).toBe(1);
    expect(informWeatherNews).not.toHaveBeenCalled();
  });

  it('T17 should return 1 without informing when url is not set', async () => {
    // Given / When
    const code = await run(['today'], {}, deps);
    // Then
    expect(code).toBe(1);
    expect(informWeatherNews).not.toHaveBeenCalled();
  });
});
