import { AxiosError } from 'axios';

abstract class BaseResponseError extends Error {
  public isResponseError = true;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError<Response = any> extends BaseResponseError {
  public statusCode = 400;
  public errorType = 'bad_request';
  public response?: Response;

  constructor(message?: string, options?: { response: Response }) {
    super(message ?? '잘못된 요청입니다. 입력값을 확인해주세요.');
    if (options !== null) {
      // this.response = options.response;
    }
  }
}

export class InvalidCredentialsError extends BaseResponseError {
  public statusCode = 403;
  public errorType = 'invalid_credentials';

  constructor(message?: string) {
    super(message ?? '올바른 인증 정보가 아닙니다.');
  }
}

export class InternalServerError extends BaseResponseError {
  public statusCode = 500;
  public errorType = 'internal_server';

  constructor(message?: string) {
    super(message ?? '네트워크에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}

export type ResponseError = BadRequestError | InvalidCredentialsError | InternalServerError;

export function isResponseError(error: any): error is ResponseError {
  return error != null && error.isResponseError;
}

export function isAxiosError<E = any>(error: any): error is AxiosError<E> {
  return error != null && error.isAxiosError === true;
}
