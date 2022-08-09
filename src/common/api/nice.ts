import { GET } from '@common/httpClient';

interface niceConfirmRes {
  name: string;
  requestNo: string;
  resultCode: string;
}

export function niceConfirm(uuid: string) {
  return GET<{ data: niceConfirmRes }>('/nice/phone/confirm', { params: { uuid } });
}
