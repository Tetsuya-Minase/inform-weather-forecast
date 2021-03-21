import { container } from '../../../src/inversify.config';
import { ConverterService } from '../../../src/domain/service/converter-service';
import { TYPES } from '../../../src/inversify.types';
import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';
import { DATE, INDEX, TEMPERATURE, WeatherDate } from '../../../src/domain/model/weather-forecast-model';

// mockHTML読み込み
const html = fs.readFileSync(path.join(__dirname, '../../resources/converter-test.html'), 'utf-8');

describe('test converter service today', () => {
  let service: ConverterService;
  let jsDom: JSDOM;

  beforeEach(() => {
    service = container.get<ConverterService>(TYPES.ConverterService);
    jsDom = new JSDOM(html);
  });

  it('domDataFormatter indexList_item', () => {
    const indexList = jsDom.window.document.querySelectorAll('.indexList_item');
    const correct: Map<INDEX, string> = new Map([
      [INDEX.WASHING, 'washingComment1'],
      [INDEX.UMBRELLA, 'umbrellaComment1'],
      [INDEX.UV, 'uv-lightComment1'],
      [INDEX.LAYERING, 'layeringComment1'],
      [INDEX.HEATSTROKE, 'heatstrokeComment1'],
      [INDEX.BEER, 'beerComment1'],
    ]);
    expect(service.indexDomDataFormatter(indexList, DATE.TODAY)).toEqual(correct);
  });

  it('domDataFormatter_pict', () => {
    const pictList = jsDom.window.document.querySelectorAll('.pict');
    const dateList = jsDom.window.document.querySelectorAll('.tabView_item');
    const correctList: Map<DATE, WeatherDate> = new Map([
      [DATE.TODAY, { weather: '曇り', date: '5月15日(水)' }],
      [DATE.TOMORROW, { weather: '曇時々晴', date: '5月16日(木)' }],
    ]);
    expect(service.weatherDomDataFormatter(pictList, dateList)).toEqual(correctList);
  });

  it('domDataFormatter_temp', () => {
    const temperatureList = jsDom.window.document.querySelectorAll('.temp');
    const correctList: Map<TEMPERATURE, string> = new Map([
      [TEMPERATURE.MAX, '23℃[+3]'],
      [TEMPERATURE.MIN, '17℃[0]'],
    ]);
    expect(service.temperatureDomDataFormatter(temperatureList, DATE.TODAY)).toEqual(correctList);
  });

  it('toDetailInformation', () => {
    const index = new Map([
      [INDEX.WASHING, 'washingComment1'],
      [INDEX.UMBRELLA, 'umbrellaComment1'],
      [INDEX.UV, 'uv-lightComment1'],
      [INDEX.LAYERING, 'layeringComment1'],
      [INDEX.HEATSTROKE, 'heatstrokeComment1'],
      [INDEX.BEER, 'beerComment1'],
    ]);
    const weatherDate = new Map([[DATE.TODAY, { weather: '曇り', date: '5月15日（水）' }]]);
    const temperature = new Map([
      [TEMPERATURE.MAX, '23℃[+3]'],
      [TEMPERATURE.MIN, '17℃[0]'],
    ]);
    const correctData = [
      '5月15日（水）の天気',
      '天気：曇り',
      '最高気温：23℃[+3]/最低気温：17℃[0]',
      '洗濯：washingComment1',
      '傘：umbrellaComment1',
      '紫外線：uv-lightComment1',
      '重ね着：layeringComment1',
      '熱中症：heatstrokeComment1',
      'ビール：beerComment1',
      'url: https://weather.yahoo.co.jp/weather/13/4410.html',
    ].join('\n');
    expect(service.toDetailInformation(index, weatherDate, temperature, DATE.TODAY)).toEqual(correctData);
  });
});

describe('test converter service tomorrow', () => {
  let service: ConverterService;
  let jsDom: JSDOM;

  beforeEach(() => {
    service = container.get<ConverterService>(TYPES.ConverterService);
    jsDom = new JSDOM(html);
  });

  it('domDataFormatter indexList_item', () => {
    const indexList = jsDom.window.document.querySelectorAll('.indexList_item');
    const correct: Map<INDEX, string> = new Map([
      [INDEX.WASHING, 'washingComment2'],
      [INDEX.UMBRELLA, 'umbrellaComment2'],
      [INDEX.UV, 'uv-lightComment2'],
      [INDEX.LAYERING, 'layeringComment2'],
      [INDEX.HEATSTROKE, 'heatstrokeComment2'],
      [INDEX.BEER, 'beerComment2'],
    ]);
    expect(service.indexDomDataFormatter(indexList, DATE.TOMORROW)).toEqual(correct);
  });

  it('domDataFormatter_temp', () => {
    const temperatureList = jsDom.window.document.querySelectorAll('.temp');
    const correctList: Map<TEMPERATURE, string> = new Map([
      [TEMPERATURE.MAX, '24℃[+1]'],
      [TEMPERATURE.MIN, '16℃[-1]'],
    ]);
    expect(service.temperatureDomDataFormatter(temperatureList, DATE.TOMORROW)).toEqual(correctList);
  });

  it('toDetailInformation', () => {
    const index = new Map([
      [INDEX.WASHING, 'washingComment2'],
      [INDEX.UMBRELLA, 'umbrellaComment2'],
      [INDEX.UV, 'uv-lightComment2'],
      [INDEX.LAYERING, 'layeringComment2'],
      [INDEX.HEATSTROKE, 'heatstrokeComment2'],
      [INDEX.BEER, 'beerComment2'],
    ]);
    const weatherDate = new Map([[DATE.TOMORROW, { weather: '曇時々晴', date: '5月16日（木）' }]]);
    const temperature = new Map([
      [TEMPERATURE.MAX, '24℃[+3]'],
      [TEMPERATURE.MIN, '16℃[-1]'],
    ]);
    const correctData = [
      '5月16日（木）の天気',
      '天気：曇時々晴',
      '最高気温：24℃[+3]/最低気温：16℃[-1]',
      '洗濯：washingComment2',
      '傘：umbrellaComment2',
      '紫外線：uv-lightComment2',
      '重ね着：layeringComment2',
      '熱中症：heatstrokeComment2',
      'ビール：beerComment2',
      'url: https://weather.yahoo.co.jp/weather/13/4410.html',
    ].join('\n');
    expect(service.toDetailInformation(index, weatherDate, temperature, DATE.TOMORROW)).toEqual(correctData);
  });
});
