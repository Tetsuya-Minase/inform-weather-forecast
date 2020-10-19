import { RequestParams, ResponseSuccess } from '../domain/model/request-types';

export interface HttpRequest {
  /**
   * getリクエストを送る
   * @param url リクエストを送るURL
   */
  get(url: string): Promise<ResponseSuccess>;

  /**
   * postリクエストを送る
   * @param param リクエストを送るときのパラメータ
   */
  post(param: RequestParams): Promise<ResponseSuccess>;
}
