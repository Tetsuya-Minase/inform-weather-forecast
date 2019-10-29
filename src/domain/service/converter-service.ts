import {
  DATE,
  DetailInformation,
  INDEX,
  TEMPERATURE,
  WeatherDate
} from "../model/weather-forecast-model";

export interface ConverterService {
  indexDomDataFormatter(domList: NodeListOf<Element>): Map<INDEX, string>;
  weatherDomDataFormatter(
    weatherDomList: NodeListOf<Element>,
    dateDomList: NodeListOf<Element>
  ): Map<DATE, WeatherDate>;
  temperatureDomDataFormatter(
    domList: NodeListOf<Element>
  ): Map<TEMPERATURE, string>;

  toDetailInformation(
    indexMap: Map<INDEX, string>,
    weatherDateMap: Map<DATE, WeatherDate>,
    temperatureMap: Map<TEMPERATURE, string>
  ): DetailInformation;
}
