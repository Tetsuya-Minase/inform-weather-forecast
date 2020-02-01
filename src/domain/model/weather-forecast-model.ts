export enum DATE {
  TODAY = '今日',
  TOMORROW = '明日'
}

export enum INDEX {
  WASHING = '洗濯',
  UMBRELLA = '傘',
  UV = '紫外線',
  LAYERING = '重ね着',
  DRY = '乾燥',
  COLD = '風邪注意',
  HEATSTROKE = '熱中症',
  BEER = 'ビール'
}

export enum TEMPERATURE {
  MAX = '最高気温',
  MIN = '最低気温'
}

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
    default:
      return undefined;
  }
};

export type WeatherDate = {
  weather: string;
  date: string;
};

export class DetailInformation {
  constructor(
    private readonly date: string | undefined,
    private readonly weather: string | undefined,
    private readonly maxTemperature: string | undefined,
    private readonly minTemperature: string | undefined,
    private readonly washing: string | undefined,
    private readonly umbrella: string | undefined,
    private readonly uv: string | undefined,
    private readonly layering: string | undefined,
    private readonly dry: string | undefined,
    private readonly cold: string | undefined,
    private readonly heatstroke: string | undefined,
    private readonly beer: string | undefined
  ) {
  }

  public toString(): string {
    if (this.heatstroke && this.beer) {
      return `${this.date}の天気\n天気：${this.weather}\n最高気温：${this.maxTemperature}/最低気温：${this.minTemperature}\n洗濯：${this.washing}\n傘：${this.umbrella}\n紫外線：${this.uv}\n重ね着：${this.layering}\n熱中症：${this.heatstroke}\nビール：${this.beer}`;
    }
    if (this.dry && this.cold) {
      return `${this.date}の天気\n天気：${this.weather}\n最高気温：${this.maxTemperature}/最低気温：${this.minTemperature}\n洗濯：${this.washing}\n傘：${this.umbrella}\n紫外線：${this.uv}\n重ね着：${this.layering}\n乾燥：${this.dry}\n風邪注意：${this.cold}`;
    }
    return `${this.date}の天気\n天気：${this.weather}\n最高気温：${this.maxTemperature}/最低気温：${this.minTemperature}\n洗濯：${this.washing}\n傘：${this.umbrella}\n紫外線：${this.uv}\n重ね着：${this.layering}`;
  }
}
