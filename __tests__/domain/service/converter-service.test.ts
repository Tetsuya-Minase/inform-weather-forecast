import { container } from '../../../src/inversify.config';
import { ConverterService } from '../../../src/domain/service/converter-service';
import { TYPES } from '../../../src/inversify.types';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';
import { DATE, INDEX, TEMPERATURE, WeatherDate } from '../../../src/domain/model/weather-forecast-model';

// mockHTML読み込み
const html = fs.readFileSync(path.join(__dirname, '../../resources/converter-test.html'), 'utf-8');

describe('test converter service', () => {
  let service: ConverterService;
  let jsDom: JSDOM;

  beforeEach(() => {
    service = container.get<ConverterService>(TYPES.ConverterService);
    jsDom = new JSDOM(html);
  });
  test('domDataFormatter indexList_item', () => {
    const indexList = jsDom.window.document.querySelectorAll('.indexList_item');
    const correct: Map<INDEX, string> = new Map([
      [INDEX.WASHING, 'washingComment1'],
      [INDEX.UMBRELLA, 'umbrellaComment1'],
      [INDEX.UV, 'uv-lightComment1'],
      [INDEX.LAYERING, 'layeringComment1'],
      [INDEX.HEATSTROKE, 'heatstrokeComment1'],
      [INDEX.BEER, 'beerComment1'],

    ]);
    expect(service.indexDomDataFormatter(indexList)).toEqual(correct);
  });
  test('domDataFormatter_pict', () => {
    const pictList = jsDom.window.document.querySelectorAll('.pict');
    const dateList = jsDom.window.document.querySelectorAll('.tabView_item');
    const correctList: Map<DATE, WeatherDate> = new Map([
      [DATE.TODAY, {weather: '曇り', date: '5月15日(水)'}],
      [DATE.TOMORROW, {weather: '曇時々晴', date: '5月16日(木)'}]
    ]);
    expect(service.weatherDomDataFormatter(pictList, dateList)).toEqual(correctList);
  });
  xtest('domDataFormatter_temp', () => {
    const temperatureList = jsDom.window.document.querySelectorAll('.temp');
    const correctList: Map<TEMPERATURE, string> = new Map([
      [TEMPERATURE.MAX, '23℃[+3]'],[TEMPERATURE.MIN, '17℃[0]']
    ]);
    expect(service.temperatureDomDataFormatter(temperatureList)).toEqual(correctList);
  });
  test('toDetailInformation', () => {
    const index = new Map([
      [INDEX.WASHING, 'washingComment1'],
      [INDEX.UMBRELLA, 'umbrellaComment1'],
      [INDEX.UV, 'uv-lightComment1'],
      [INDEX.LAYERING, 'layeringComment1'],
      [INDEX.HEATSTROKE, 'heatstrokeComment1'],
      [INDEX.BEER, 'beerComment1']
    ]);
    const weatherDate = new Map([
      [DATE.TODAY, { weather: '曇り', date: '5月15日（水）' }]
    ]);
    const temperature = new Map([
      [TEMPERATURE.MAX, '23℃[+3]'],
      [TEMPERATURE.MIN, '17℃[0]']
    ]);
    const correctData = {
      date: '5月15日（水）',
      weather: '曇り',
      maxTemperature: '23℃[+3]',
      minTemperature: '17℃[0]',
      washing: 'washingComment1',
      umbrella: 'umbrellaComment1',
      uv: 'uv-lightComment1',
      layering: 'layeringComment1',
      heatstroke: 'heatstrokeComment1',
      beer: 'beerComment1'
    };
    expect(service.toDetailInformation(index, weatherDate, temperature)).toMatchObject(correctData);
  });
});
