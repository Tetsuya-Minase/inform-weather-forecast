import { ConverterService } from '../converter-service';
import { injectable } from 'inversify';
import {
  DATE,
  detailInformationToString,
  getIndexFromText,
  INDEX,
  TEMPERATURE,
  WeatherDate,
} from '../../model/weather-forecast-model';

@injectable()
export class ConverterServiceImpl implements ConverterService {
  public indexDomDataFormatter(domList: NodeListOf<Element>, date: DATE): Map<INDEX, string> {
    const resultMap = new Map<INDEX, string>();
    domList.forEach((dom) => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      const indexKey = getIndexFromText(data[0]);
      // keyなし or スキップ
      if (indexKey === undefined || this.isSkip(date, indexKey, resultMap)) {
        return;
      }
      resultMap.set(indexKey, data[2]);
    });
    return resultMap;
  }

  public weatherDomDataFormatter(
    weatherDomList: NodeListOf<Element>,
    dateDomList: NodeListOf<Element>
  ): Map<DATE, WeatherDate> {
    const resultMap = new Map<DATE, WeatherDate>();
    const weatherList: string[] = [];
    const dateList: string[] = [];
    weatherDomList.forEach((dom) => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      weatherList.push(...data);
    });
    dateDomList.forEach((dom) => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      dateList.push(...data);
    });
    resultMap.set(DATE.TODAY, {
      weather: weatherList[0],
      date: dateList[0],
    });
    resultMap.set(DATE.TOMORROW, {
      weather: weatherList[1],
      date: dateList[1],
    });
    return resultMap;
  }

  public temperatureDomDataFormatter(domList: NodeListOf<Element>, date: DATE): Map<TEMPERATURE, string> {
    const resultMap = new Map<TEMPERATURE, string>();
    const tempList: string[] = [];
    domList.forEach((dom) => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      tempList.push(...data);
    });

    switch (date) {
      case DATE.TODAY:
        resultMap.set(TEMPERATURE.MAX, tempList[0]);
        resultMap.set(TEMPERATURE.MIN, tempList[1]);
        break;
      case DATE.TOMORROW:
        resultMap.set(TEMPERATURE.MAX, tempList[2]);
        resultMap.set(TEMPERATURE.MIN, tempList[3]);
        break;
      default:
        // ログだけ吐いて何もしない
        const _date: never = date;
        console.error(`date(${_date}) is invalid.`);
    }
    return resultMap;
  }

  public toDetailInformation(
    indexMap: Map<INDEX, string>,
    weatherDateMap: Map<DATE, WeatherDate>,
    temperatureMap: Map<TEMPERATURE, string>,
    date: DATE
  ): string {
    const weatherDate: WeatherDate | undefined = weatherDateMap.get(date);
    return detailInformationToString({
      date: weatherDate?.date,
      weather: weatherDate?.weather,
      maxTemperature: temperatureMap.get(TEMPERATURE.MAX),
      minTemperature: temperatureMap.get(TEMPERATURE.MIN),
      washing: indexMap.get(INDEX.WASHING),
      umbrella: indexMap.get(INDEX.UMBRELLA),
      uv: indexMap.get(INDEX.UV),
      layering: indexMap.get(INDEX.LAYERING),
      dry: indexMap.get(INDEX.DRY),
      cold: indexMap.get(INDEX.COLD),
      heatstroke: indexMap.get(INDEX.HEATSTROKE),
      beer: indexMap.get(INDEX.BEER),
    });
  }

  /**
   * テキストを改行毎に分割する
   * @param text 分割したいテキスト
   * @returns 分割したテキスト
   * @private
   */
  private textSplitter(text: string): string[] {
    return text
      .replace(/ /g, '')
      .split('\n')
      .filter((r) => r !== '');
  }

  /**
   * 重複したときスキップするかどうか
   * @param date 取得対象が強化
   * @param key マップkey
   * @param map マップ
   * @private
   */
  private isSkip(date: DATE, key: INDEX, map: Map<INDEX, string>): boolean {
    // 取得対象が今日の時は重複スキップする
    return date === DATE.TODAY && map.has(key);
  }
}
