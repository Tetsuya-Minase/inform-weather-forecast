export type DiscordConfig = {
  readonly url: string;
  readonly mention: string;
};

/**
 * 環境変数から Discord の設定を読み込む
 * @param env 環境変数
 */
export const loadDiscordConfig = (env: Readonly<Record<string, string | undefined>>): DiscordConfig => {
  const url = env.DISCORD_URL;
  if (url === undefined || url.trim() === '') {
    throw new Error('DISCORD_URL is not set');
  }
  return { url, mention: env.DISCORD_MENTION ?? '' };
};
