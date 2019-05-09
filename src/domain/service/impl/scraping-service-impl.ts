import {HttpRequest} from '../../../infrastructure/http-request';
import {JSDOM} from 'jsdom';
import {RequestResponse} from "../../model/request-response";
import {ScrapingService} from "../scraping-service";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "../../../inversify.types";

@injectable()
export class ScrapingServiceImpl implements ScrapingService{
    private request: HttpRequest;

    constructor(
        @inject(TYPES.HttpRequest) httpRequest: HttpRequest
    ) {
        this.request = httpRequest;
    }

    public async fetchDomData(url: string): Promise<JSDOM> {
        const response: RequestResponse = await this.request.get(url).catch(e => {throw e});
        return new JSDOM(response['body']);
    }
}
