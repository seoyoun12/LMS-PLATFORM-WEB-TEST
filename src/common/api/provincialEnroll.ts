import { DELETE, GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import {
  ProvincialEnrollResponseDto,
  ProvincialEnrollSaveRequestDto,
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

