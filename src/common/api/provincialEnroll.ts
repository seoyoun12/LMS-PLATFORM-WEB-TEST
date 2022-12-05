import { POST } from '@common/httpClient';
import { ProvincialEnrollSaveRequestDto } from './Api';

export function enrollProvincial(requestDto: ProvincialEnrollSaveRequestDto) {
  return POST<any>(`/provincial/enroll`, requestDto);
}
