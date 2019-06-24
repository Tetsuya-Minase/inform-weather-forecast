import { HttpRequest } from '../../../infrastructure/http-request';
import { InformSlackService } from '../inform-slack-service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../../inversify.types';

@injectable()
export class InformSlackServiceImpl implements InformSlackService {
  private _httpRequest: HttpRequest;
  private slackUrl = process.env.WEBHOOK;

  constructor(@inject(TYPES.HttpRequest) httpRequest: HttpRequest) {
    this._httpRequest = httpRequest;
  }

  public async informMessage(message: string) {
    const param = {
      url: this.slackUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: {
        channel: '#weather',
        username: 'webhookbot',
        text: message
      }
    };
    console.info('request param:', param);
    await this._httpRequest.post(param);
  }
}
