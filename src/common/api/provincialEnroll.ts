import { DELETE, GET, PUT } from '@common/httpClient';

import { ProvincialEnrollResponseDto,ProvincialEnrollUpdateRequestDto } from './Api';

export function getEnrollProvincialDetail(enrollSeq: number) {
  return GET<{ data: ProvincialEnrollResponseDto }>(
    `/provincial/enroll/${enrollSeq}`
  );
}

export function cancelEnrollProvincial(enrollSeq: number) {
  return DELETE(`/provincial/enroll/${enrollSeq}`);
}

export function updateEnrollProvincial(enrollSeq: number, enrollDto: ProvincialEnrollUpdateRequestDto) {
  return PUT(`/provincial/enroll/${enrollSeq}`, enrollDto);
}

