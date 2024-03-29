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
      [INDEX.ICE, 'iceComment1'],
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
      [INDEX.ICE, 'iceComment1'],
    ]);
    const weatherDate = new Map([[DATE.TODAY, { weather: '曇り', date: '5月15日（水）' }]]);
    const temperature = new Map([
      [TEMPERATURE.MAX, '23℃[+3]'],
      [TEMPERATURE.MIN, '17℃[0]'],
    ]);
    const correctData = {
      date: '5月15日（水）の天気',
      notificationData: [
        {
          name: '天気',
          value: '曇り',
        },
        {
          name: '最高気温',
          value: '23℃[+3]',
        },
        {
          name: '最低気温',
          value: '17℃[0]',
        },
        {
          name: '洗濯',
          value: 'washingComment1',
        },
        {
          name: '傘',
          value: 'umbrellaComment1',
        },
        {
          name: '紫外線',
          value: 'uv-lightComment1',
        },
        {
          name: '重ね着',
          value: 'layeringComment1',
        },
        {
          name: '熱中症',
          value: 'heatstrokeComment1',
        },
        {
          name: 'ビール',
          value: 'beerComment1',
        },
        {
          name: 'アイス',
          value: 'iceComment1',
        },
        {
          name: 'url',
          value: 'https://weather.yahoo.co.jp/weather/jp/11/4310.html',
        },
      ],
    };
    expect(
      service.toDetailInformation(
        index,
        weatherDate,
        temperature,
        DATE.TODAY,
        'https://weather.yahoo.co.jp/weather/jp/11/4310.html'
      )
    ).toEqual(correctData);
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
      [INDEX.ICE, 'iceComment2'],
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
      [INDEX.ICE, 'iceComment2'],
    ]);
    const weatherDate = new Map([[DATE.TOMORROW, { weather: '曇時々晴', date: '5月16日（木）' }]]);
    const temperature = new Map([
      [TEMPERATURE.MAX, '24℃[+3]'],
      [TEMPERATURE.MIN, '16℃[-1]'],
    ]);
    const correctData = {
      date: '5月16日（木）の天気',
      notificationData: [
        {
          name: '天気',
          value: '曇時々晴',
        },
        {
          name: '最高気温',
          value: '24℃[+3]',
        },
        {
          name: '最低気温',
          value: '16℃[-1]',
        },
        {
          name: '洗濯',
          value: 'washingComment2',
        },
        {
          name: '傘',
          value: 'umbrellaComment2',
        },
        {
          name: '紫外線',
          value: 'uv-lightComment2',
        },
        {
          name: '重ね着',
          value: 'layeringComment2',
        },
        {
          name: '熱中症',
          value: 'heatstrokeComment2',
        },
        {
          name: 'ビール',
          value: 'beerComment2',
        },
        {
          name: 'アイス',
          value: 'iceComment2',
        },
        {
          name: 'url',
          value: 'https://weather.yahoo.co.jp/weather/jp/11/4310.html',
        },
      ],
    };
    expect(
      service.toDetailInformation(
        index,
        weatherDate,
        temperature,
        DATE.TOMORROW,
        'https://weather.yahoo.co.jp/weather/jp/11/4310.html'
      )
    ).toEqual(correctData);
  });
});
