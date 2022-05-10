import { api } from '@common/httpClient';
import { HttpError } from '@common/errors';

export const responseInterceptor = () => {
  api.interceptors.response.use(
    (response) => {
      console.log('RESPONSE', response);
      if (!!response && response.status < 200 || response.status > 299) {
        return HttpError.fromRequest(response);
      }

      return response;
    }
  );
};
