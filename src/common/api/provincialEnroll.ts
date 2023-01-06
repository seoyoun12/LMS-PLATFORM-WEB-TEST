import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import {
  ProvincialEnrollResponseDto,
  ProvincialEnrollSaveRequestDto,
  ProvincialEnrollUpdateRequestDto,
} from './Api';

export function enrollProvincial(requestDto: ProvincialEnrollSaveRequestDto) {
  return POST<any>(`/provincial/enroll`, requestDto);
}

export function useEnrollProvincialList() {
  const { data, error, mutate } = useSWR<
    SWRResponse<ProvincialEnrollResponseDto[]>
  >(`/provincial/enroll`, GET);
  return {
    enrollData: data?.data,
    enrollError: error,
    enrollMutate: mutate,
  };
}

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

