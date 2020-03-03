import { HttpRequest } from '../../../infrastructure/http-request';
import { InformSlackService } from '../inform-slack-service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../../inversify.types';
import { RequestParams } from '../../model/request-types';
import { config } from 'firebase-functions';

@injectable()
export class InformSlackServiceImpl implements InformSlackService {
  private readonly SLACK_URL: string;

  constructor(@inject(TYPES.HttpRequest) private readonly httpRequest: HttpRequest) {
    this.SLACK_URL = config().slack.url;
  }

  public async informMessage(message: string) {
    const param: RequestParams = {
      url: this.SLACK_URL || '',
      data: {
        channel: '#weather',
        username: 'webhookbot',
        text: message
      }
    };
    console.info('request param:', param);
    await this.httpRequest.post(param);
  }
}
