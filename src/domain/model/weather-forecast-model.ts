export const DATE = {
  TODAY: '今日',
  TOMORROW: '明日',
} as const;
export type DATE = typeof DATE[keyof typeof DATE];

export const INDEX = {
  WASHING: '洗濯',
  UMBRELLA: '傘',
  UV: '紫外線',
  LAYERING: '重ね着',
  DRY: '乾燥',
  COLD: '風邪注意',
  HEATSTROKE: '熱中症',
  BEER: 'ビール',
  ICE: 'アイス',
} as const;
export type INDEX = typeof INDEX[keyof typeof INDEX];

export const TEMPERATURE = {
  MAX: '最高気温',
  MIN: '最低気温',
} as const;
export type TEMPERATURE = typeof TEMPERATURE[keyof typeof TEMPERATURE];

export const getIndexFromText = (text: string): INDEX | undefined => {
  switch (text) {
    case INDEX.WASHING:
      return INDEX.WASHING;
    case INDEX.UMBRELLA:
      return INDEX.UMBRELLA;
    case INDEX.UV:
      return INDEX.UV;
    case INDEX.LAYERING:
      return INDEX.LAYERING;
    case INDEX.DRY:
      return INDEX.DRY;
    case INDEX.COLD:
      return INDEX.COLD;
    case INDEX.HEATSTROKE:
      return INDEX.HEATSTROKE;
    case INDEX.BEER:
      return INDEX.BEER;
    case INDEX.ICE:
      return INDEX.ICE;
    default:
      return undefined;
  }
};

export type WeatherDate = Readonly<{
  weather: string;
  date: string;
}>;

type DetailInformationParameter = Partial<
  Readonly<{
    date: string;
    weather: string;
    maxTemperature: string;
    minTemperature: string;
    washing: string;
    umbrella: string;
    layering: string;
    dry: string;
    cold: string;
    heatstroke: string;
    beer: string;
    uv: string;
    ice: string;
    url: string;
  }>
>;

export type NotificationData = Array<{
  readonly name: INDEX | TEMPERATURE | 'url' | '天気';
  readonly value: string;
}>;

export const detailInformationToNotificationData = ({
  weather,
  maxTemperature,
  minTemperature,
  washing,
  umbrella,
  layering,
  dry,
  cold,
  heatstroke,
  beer,
  uv,
  ice,
  url,
}: DetailInformationParameter): NotificationData => {
  const result: NotificationData = [];
  if (weather) {
    result.push({ name: '天気', value: weather });
  }
  if (maxTemperature && minTemperature) {
    result.push({ name: '最高気温', value: maxTemperature });
    result.push({ name: '最低気温', value: minTemperature });
  }
  if (washing) {
    result.push({ name: '洗濯', value: washing });
  }
  if (umbrella) {
    result.push({ name: '傘', value: umbrella });
  }
  if (uv) {
    result.push({ name: '紫外線', value: uv });
  }
  if (layering) {
    result.push({ name: '重ね着', value: layering });
  }
  if (dry) {
    result.push({ name: '乾燥', value: dry });
  }
  if (cold) {
    result.push({ name: '風邪注意', value: cold });
  }
  if (heatstroke) {
    result.push({ name: '熱中症', value: heatstroke });
  }
  if (beer) {
    result.push({ name: 'ビール', value: beer });
  }
  if (ice) {
    result.push({ name: 'アイス', value: ice });
  }
  result.push({ name: 'url', value: url || 'https://weather.yahoo.co.jp/weather/' });
  return result;
};
