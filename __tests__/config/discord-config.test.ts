import { loadDiscordConfig } from '../../src/config/discord-config';

describe('loadDiscordConfig', () => {
  const URL = 'https://discord.com/api/webhooks/1/abc';

  it('T1 should return url and mention when both are set', () => {
    // Given
    const env = { DISCORD_URL: URL, DISCORD_MENTION: '<@&123>' };
    // When
    const result = loadDiscordConfig(env);
    // Then
    expect(result).toEqual({ url: URL, mention: '<@&123>' });
  });

  it('T2 should throw when url is not set', () => {
    // Given
    const env = { DISCORD_MENTION: '<@&123>' };
    // When / Then
    expect(() => loadDiscordConfig(env)).toThrow(new Error('DISCORD_URL is not set'));
  });

  it('T3 should throw when url is empty', () => {
    // Given
    const env = { DISCORD_URL: '', DISCORD_MENTION: '<@&123>' };
    // When / Then
    expect(() => loadDiscordConfig(env)).toThrow(new Error('DISCORD_URL is not set'));
  });

  it('T4 should throw when url is whitespace only', () => {
    // Given
    const env = { DISCORD_URL: '   ' };
    // When / Then
    expect(() => loadDiscordConfig(env)).toThrow(new Error('DISCORD_URL is not set'));
  });

  it('T5 should return empty mention when mention is not set', () => {
    // Given
    const env = { DISCORD_URL: URL };
    // When
    const result = loadDiscordConfig(env);
    // Then
    expect(result).toEqual({ url: URL, mention: '' });
  });

  // P2: 例外を投げない限り url は空でない
  it.each<[Record<string, string | undefined>]>([
    [{ DISCORD_URL: URL }],
    [{ DISCORD_URL: ` ${URL} `, DISCORD_MENTION: '' }],
    [{ DISCORD_URL: 'x', DISCORD_MENTION: '<@1>' }],
    [{ DISCORD_URL: '', DISCORD_MENTION: '<@1>' }],
    [{ DISCORD_URL: '\t\n ' }],
    [{}],
  ])('P2 should never return blank url unless it throws: %j', (env) => {
    // Given / When
    let result;
    try {
      result = loadDiscordConfig(env);
    } catch {
      return;
    }
    // Then
    expect(result.url.trim()).not.toBe('');
  });
});
