import 'reflect-metadata';
import 'source-map-support/register';
import { DiscordConfig, loadDiscordConfig } from './src/config/discord-config';
import { parseTarget } from './src/config/target';
import { createContainer } from './src/inversify.config';
import { TYPES } from './src/inversify.types';
import { WeatherNews } from './src/interface/weather-news';

export type Deps = {
  readonly createWeatherNews: (config: DiscordConfig) => Pick<WeatherNews, 'informWeatherNews'>;
};

const defaultDeps: Deps = {
  createWeatherNews: (config) => createContainer(config).get<WeatherNews>(TYPES.WeatherNews),
};

/**
 * 天気を通知する
 * @param args 実行引数（第1引数に today / tomorrow）
 * @param env 環境変数
 * @param deps 依存
 * @returns 終了コード
 */
export const run = async (
  args: ReadonlyArray<string>,
  env: Readonly<Record<string, string | undefined>>,
  deps: Deps = defaultDeps
): Promise<number> => {
  try {
    const target = parseTarget(args[0]);
    const config = loadDiscordConfig(env);
    console.log('start');
    await deps.createWeatherNews(config).informWeatherNews(target);
    console.log('end');
    return 0;
  } catch (e) {
    console.error('error end:', e);
    return 1;
  }
};

if (require.main === module) {
  run(process.argv.slice(2), process.env).then((code) => {
    process.exitCode = code;
  });
}
