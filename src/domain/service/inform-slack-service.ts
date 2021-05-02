import { HttpRequest } from '../../infrastructure/http-request';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../inversify.types';
import { RequestParams } from '../model/request-types';
import { config } from 'firebase-functions';

@injectable()
export class InformSlackService {
  private readonly SLACK_URL: string;

  constructor(@inject(TYPES.HttpRequest) private readonly httpRequest: HttpRequest) {
    this.SLACK_URL = config().slack.url;
  }

  /**
   * slackに通知する
   * @param message slackに通知するメッセージ
   */
  public async informMessage(message: string) {
    const param: RequestParams = {
      url: this.SLACK_URL || '',
      data: {
        channel: '#weather',
        username: 'weather-forecast-kun',
        text: message,
      },
    };
    console.info('request param:', param);
    await this.httpRequest.post(param);
  }
}
