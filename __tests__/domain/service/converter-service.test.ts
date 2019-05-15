import {container} from '../../../src/inversify.config';
import {ConverterService} from "../../../src/domain/service/converter-service";
import {TYPES} from "../../../src/inversify.types";
import {JSDOM} from "jsdom";
import {} from 'jest';
import * as fs from 'fs';
import * as path from 'path';

// mockHTML読み込み
const html = fs.readFileSync(path.join(__dirname, '../../resources/converter-test.html'), 'utf-8');

describe('test converter service', () => {
    let service: ConverterService;
    let jsDom: JSDOM;

    beforeEach(() => {
        service = container.get<ConverterService>(TYPES.ConverterService);
        jsDom = new JSDOM(html);
    });
    test('domDataFormatter_indexList_item', () => {
        const indexList = jsDom.window.document.querySelectorAll('.indexList_item');
        const correctList: Array<Array<string>> = [
            ['日付', '5月15日（水）', '5月16日（木）'],
            ['洗濯', 'index50', 'washingComment1', 'index70', 'washingComment2'],
            ['傘', 'index10', 'umbrellaComment1', 'index10', 'umbrellaComment2'],
            ['紫外線', 'index20', 'uv-lightComment1', 'index20', 'uv-lightComment2'],
            ['重ね着', 'index40', 'layeringComment1', 'index30', 'layeringComment2'],
            ['熱中症', 'index0', 'heatstrokeComment1', 'index20', 'heatstrokeComment2'],
            ['ビール', 'index10', 'beerComment1', 'index30', 'beerComment2']
        ];
        expect(service.domDataFormatter(indexList)).toStrictEqual(correctList);
    });
    test('domDataFormatter_pict', () => {
        const indexList = jsDom.window.document.querySelectorAll('.pict');
        const correctList: Array<Array<string>> = [
            ['曇り'], ['曇時々晴']
        ];
        expect(service.domDataFormatter(indexList)).toStrictEqual(correctList);
    });
    test('domDataFormatter_temp', () => {
        const indexList = jsDom.window.document.querySelectorAll('.temp');
        const correctList: Array<Array<string>> = [
            ['23℃[+3]', '17℃[0]'], ['24℃[+1]', '16℃[-1]']
        ];
        expect(service.domDataFormatter(indexList)).toStrictEqual(correctList);
    });
    test('domDataFormatter_time', () => {
        const indexList = jsDom.window.document.querySelectorAll('.time');
        const correctList: Array<Array<string>> = [
            ['time', '0-6', '6-12', '12-18', '18-24'], ['time', '0-6', '6-12', '12-18', '18-24']
        ];
        expect(service.domDataFormatter(indexList)).toStrictEqual(correctList);
    });
    test('domDataFormatter_precip', () => {
        const indexList = jsDom.window.document.querySelectorAll('.precip');
        const correctList: Array<Array<string>> = [
            ['rain', '---', '---', '---', '10％'], ['rain', '10％', '10％', '10％', '10％']
        ];
        expect(service.domDataFormatter(indexList)).toStrictEqual(correctList);
    });
    test('list2TodayDetailInformation', () => {
        const indexList = [
            ['日付', '5月15日（水）'],
            ['洗濯', 'index50', 'washingComment1'],
            ['傘', 'index10', 'umbrellaComment1'],
            ['紫外線', 'index20', 'uv-lightComment1'],
            ['重ね着', 'index40', 'layeringComment1'],
            ['熱中症', 'index0', 'heatstrokeComment1'],
            ['ビール', 'index10', 'beerComment1']
        ];
        const pictList = [
            ['曇り']
        ];
        const temperatureList = [
            ['23℃[+3]', '17℃[0]']
        ];
        const correctData = {
            date: '5月15日（水）',
            weather: '曇り',
            maxTemperature: '23℃[+3]',
            minTemperature: '17℃[0]',
            washing: 'washingComment1',
            umbrella: 'umbrellaComment1',
            uvLight: 'uv-lightComment1',
            layering: 'layeringComment1',
            heatstroke: 'heatstrokeComment1',
            beer: 'beerComment1'
        };
        expect(service.list2TodayDetailInformation(indexList, pictList, temperatureList)).toStrictEqual(correctData);
    });
});
