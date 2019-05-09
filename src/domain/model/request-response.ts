type ResponseSuccess = {
  response: any;
  body: string;
};
type ResponseError = {
  error: any;
};

export type RequestResponse = ResponseSuccess | ResponseError;
