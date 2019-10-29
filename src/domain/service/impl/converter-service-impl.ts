import { ConverterService } from "../converter-service";
import { injectable } from "inversify";
import {
  DATE,
  DetailInformation,
  getIndexFromText,
  INDEX,
  TEMPERATURE,
  WeatherDate
} from "../../model/weather-forecast-model";

@injectable()
export class ConverterServiceImpl implements ConverterService {
  public indexDomDataFormatter(
    domList: NodeListOf<Element>
  ): Map<INDEX, string> {
    const resultMap = new Map<INDEX, string>();
    domList.forEach(dom => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      const indexKey = getIndexFromText(data[0]);
      if (indexKey === undefined) {
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
    weatherDomList.forEach(dom => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      weatherList.push(...data);
    });
    dateDomList.forEach(dom => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      dateList.push(...data);
    });
    resultMap.set(DATE.TODAY, {
      weather: weatherList[0],
      date: dateList[0]
    });
    resultMap.set(DATE.TOMORROW, {
      weather: weatherList[1],
      date: dateList[1]
    });
    return resultMap;
  }

  public temperatureDomDataFormatter(
    domList: NodeListOf<Element>
  ): Map<TEMPERATURE, string> {
    const resultMap = new Map<TEMPERATURE, string>();
    const tempList: string[] = [];
    domList.forEach(dom => {
      if (dom.textContent === null) {
        return;
      }
      const data = this.textSplitter(dom.textContent);
      tempList.push(...data);
    });
    resultMap.set(TEMPERATURE.MAX, tempList[0]);
    resultMap.set(TEMPERATURE.MIN, tempList[1]);
    return resultMap;
  }

  public toDetailInformation(
    indexMap: Map<INDEX, string>,
    weatherDateMap: Map<DATE, WeatherDate>,
    temperatureMap: Map<TEMPERATURE, string>
  ): DetailInformation {
    const weatherDate: WeatherDate | undefined = weatherDateMap.get(DATE.TODAY);

    return new DetailInformation(
      (weatherDate && weatherDate.date) || undefined,
      (weatherDate && weatherDate.weather) || undefined,
      temperatureMap.get(TEMPERATURE.MAX),
      temperatureMap.get(TEMPERATURE.MIN),
      indexMap.get(INDEX.WASHING),
      indexMap.get(INDEX.UMBRELLA),
      indexMap.get(INDEX.UV),
      indexMap.get(INDEX.LAYERING),
      indexMap.get(INDEX.DRY),
      indexMap.get(INDEX.COLD),
      indexMap.get(INDEX.HEATSTROKE),
      indexMap.get(INDEX.BEER)
    );
  }

  private textSplitter(text: string): string[] {
    return text
      .replace(/ /g, "")
      .split("\n")
      .filter(r => r !== "");
  }
}
