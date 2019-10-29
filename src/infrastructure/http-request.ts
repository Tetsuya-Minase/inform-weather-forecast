import { ResponseSuccess } from "../domain/model/request-types";

export interface HttpRequest {
  get(url: string): Promise<ResponseSuccess>;

  post(param: any): Promise<ResponseSuccess>;
}
