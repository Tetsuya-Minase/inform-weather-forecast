export type ResponseSuccess = {
  status: number;
  data: string;
};
export type RequestParams = {
  url: string;
  data: {
    channel: string;
    username: string;
    text: string;
  };
};
export class ResponseError extends Error {
  constructor(
    private status: number,
    private error: any,
    public message: string
  ) {
    super(message);
  }
}
