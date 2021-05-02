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

export const detailInformationToString = ({
  date,
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
}: DetailInformationParameter): string => {
  const result: string[] = [];
  if (date) {
    result.push(`${date}の天気`);
  }
  if (weather) {
    result.push(`天気：${weather}`);
  }
  if (maxTemperature && minTemperature) {
    result.push(`最高気温：${maxTemperature}/最低気温：${minTemperature}`);
  }
  if (washing) {
    result.push(`洗濯：${washing}`);
  }
  if (umbrella) {
    result.push(`傘：${umbrella}`);
  }
  if (uv) {
    result.push(`紫外線：${uv}`);
  }
  if (layering) {
    result.push(`重ね着：${layering}`);
  }
  if (dry) {
    result.push(`乾燥：${dry}`);
  }
  if (cold) {
    result.push(`風邪注意：${cold}`);
  }
  if (heatstroke) {
    result.push(`熱中症：${heatstroke}`);
  }
  if (beer) {
    result.push(`ビール：${beer}`);
  }
  if (ice) {
    result.push(`アイス：${ice}`);
  }
  result.push(`url: ${url}`);
  return result.join('\n');
};
