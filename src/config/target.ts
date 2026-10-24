import { DATE } from '../domain/model/weather-forecast-model';

/**
 * 実行引数を通知対象の日に変換する
 * @param arg 実行引数（today / tomorrow）
 */
export const parseTarget = (arg: string | undefined): DATE => {
  switch (arg) {
    case 'today':
      return DATE.TODAY;
    case 'tomorrow':
      return DATE.TOMORROW;
    default:
      throw new Error(`invalid target: ${arg}`);
  }
};
