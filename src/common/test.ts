import { requestGET } from '@common/httpClient';

export function healthCheck() {
  return requestGET('api/v1/example');
}
