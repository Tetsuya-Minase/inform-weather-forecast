import { ConverterService } from '../converter-service';
import { injectable } from 'inversify';

@injectable()
export class ConverterServiceImpl implements ConverterService {
  public domDataFormatter(domList) {
    const returnList: Array<any> = [];
    for (const dom of domList) {
      const data = dom.textContent
        .replace(/ /g, '')
        .split('\n')
        .filter(r => r !== '');
      returnList.push(data);
    }
    return returnList;
  }

  public list2FullInformation(
    indexList: Array<Array<string>>,
    pictDataList: Array<Array<string>>,
    temperatureDataList: Array<Array<string>>
  ) {
    const indexDataList: Array<object> = [{}, {}];
    // 天気設定
    indexDataList[0]['weather'] = pictDataList[0][0];
    indexDataList[1]['weather'] = pictDataList[1][0];
    // 気温設定
    indexDataList[0]['maxTemperature'] = temperatureDataList[0][0];
    indexDataList[0]['minTemperature'] = temperatureDataList[0][1];
    indexDataList[1]['maxTemperature'] = temperatureDataList[1][0];
    indexDataList[1]['minTemperature'] = temperatureDataList[1][1];
    // 指標設定
    indexList.forEach(l => {
      // 先頭がリストのラベルなので振り分け
      switch (l[0]) {
        case '日付':
          indexDataList[0]['date'] = l[1];
          indexDataList[1]['date'] = l[2];
          break;
        case '洗濯':
          indexDataList[0]['washing'] = `${l[1]} ${l[2]}`;
          indexDataList[1]['washing'] = `${l[3]} ${l[4]}`;
          break;
        case '傘':
          indexDataList[0]['umbrella'] = `${l[1]} ${l[2]}`;
          indexDataList[1]['umbrella'] = `${l[1]} ${l[2]}`;
          break;
        case '紫外線':
          indexDataList[0]['uvLight'] = `${l[1]} ${l[2]}`;
          indexDataList[1]['uvLight'] = `${l[1]} ${l[2]}`;
          break;
        case '重ね着':
          indexDataList[0]['layering'] = `${l[1]} ${l[2]}`;
          indexDataList[1]['layering'] = `${l[1]} ${l[2]}`;
          break;
        case '熱中症':
          indexDataList[0]['heatstroke'] = `${l[1]} ${l[2]}`;
          indexDataList[1]['heatstroke'] = `${l[1]} ${l[2]}`;
          break;
        case 'ビール':
          indexDataList[0]['beer'] = `${l[1]} ${l[2]}`;
          indexDataList[1]['beer'] = `${l[1]} ${l[2]}`;
          break;
        default:
        // 一致しなければ何もしない
      }
    });
    return indexDataList;
  }

  public list2TodayDetailInformation(
    list: Array<Array<string>>,
    pictDataList: Array<Array<string>>,
    temperatureDataList: Array<Array<string>>
  ) {
    const indexData = {};
    // 天気設定
    indexData['weather'] = pictDataList[0][0];
    // 気温設定
    indexData['maxTemperature'] = temperatureDataList[0][0];
    indexData['minTemperature'] = temperatureDataList[0][1];
    list.forEach(l => {
      // 先頭がリストのラベルなので振り分け
      switch (l[0]) {
        case '日付':
          indexData['date'] = l[1];
          break;
        case '洗濯':
          indexData['washing'] = l[2];
          break;
        case '傘':
          indexData['umbrella'] = l[2];
          break;
        case '紫外線':
          indexData['uvLight'] = l[2];
          break;
        case '重ね着':
          indexData['layering'] = l[2];
          break;
        case '熱中症':
          indexData['heatstroke'] = l[2];
          break;
        case 'ビール':
          indexData['beer'] = l[2];
          break;
        default:
        // 一致しなければ何もしない
      }
    });
    return indexData;
  }
}
