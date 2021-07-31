import { HttpRequest } from '../../infrastructure/http-request';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../inversify.types';
import { RequestParams } from '../model/request-types';
import { config } from 'firebase-functions';
import { NotificationData } from '../model/weather-forecast-model';

@injectable()
export class InformService {
  private readonly URL: string;

  constructor(@inject(TYPES.HttpRequest) private readonly httpRequest: HttpRequest) {
    this.URL = config().discord.url;
  }

  /**
   * 通知する
   * @param date 天気の日付
   * @param notificationData 通知するデータ
   */
  public async informMessage(date: string, notificationData: NotificationData) {
    const param: RequestParams = {
      url: this.URL || '',
      data: {
        content: '@everyone',
        embeds: [
          {
            title: date,
            fields: notificationData,
          },
        ],
      },
    };
    console.info('request param:', param);
    await this.httpRequest.post(param);
  }
}
