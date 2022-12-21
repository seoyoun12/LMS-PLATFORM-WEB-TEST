import { GET } from '@common/httpClient';
import { NicePhoneResultResponseDto } from './Api';

interface niceConfirmRes {
  name: string;
  requestNo: string;
  resultCode: string;
}

export function niceConfirm(uuid: string) {
  return GET<{ data: NicePhoneResultResponseDto }>('/nice/phone/confirm', { params: { uuid } });
}
