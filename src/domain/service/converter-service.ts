import { DATE, INDEX, TEMPERATURE, WeatherDate } from '../model/weather-forecast-model';

export interface ConverterService {
  /**
   * 主要な情報をMap形式に変換する
   * @param domList domの状態
   * @param date 日付(今日、明日)
   */
  indexDomDataFormatter(domList: NodeListOf<Element>, date: DATE): Map<INDEX, string>;

  /**
   * 天気と日付の情報をMap形式に変換する
   * @param weatherDomList 天気についてのdom
   * @param dateDomList 日付についてのdom
   */
  weatherDomDataFormatter(
    weatherDomList: NodeListOf<Element>,
    dateDomList: NodeListOf<Element>
  ): Map<DATE, WeatherDate>;

  /**
   * 気温の情報をMap形式に変換する
   * @param domList domの状態
   * @param date 日付(今日、明日)
   */
  temperatureDomDataFormatter(domList: NodeListOf<Element>, date: DATE): Map<TEMPERATURE, string>;

  /**
   * slackに通知する文章を作成する
   * @param indexMap 主要な情報のMap
   * @param weatherDateMap 天気と日付についてのMap
   * @param temperatureMap 気温と日付についてのMap
   * @param date 日付(今日、明日)
   */
  toDetailInformation(
    indexMap: Map<INDEX, string>,
    weatherDateMap: Map<DATE, WeatherDate>,
    temperatureMap: Map<TEMPERATURE, string>,
    date: DATE
  ): string;
}
