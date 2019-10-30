import { HttpRequest } from '../../../infrastructure/http-request';
import { InformSlackService } from '../inform-slack-service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../../inversify.types';
import { RequestParams } from '../../model/request-types';

@injectable()
export class InformSlackServiceImpl implements InformSlackService {
  private slackUrl = process.env.WEBHOOK;

  constructor(
    @inject(TYPES.HttpRequest) private readonly httpRequest: HttpRequest
  ) {}

  public async informMessage(message: string) {
    const param: RequestParams = {
      url: this.slackUrl || '',
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
