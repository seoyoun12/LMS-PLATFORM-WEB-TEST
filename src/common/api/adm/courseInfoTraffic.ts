import { GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import {
  ProvincialEnrollResponseDto,
  ProvincialEnrollUpdateRequestDto,
} from '../Api';

export function useCourseInfoTraffic(elementCnt: number, page: number) {
  const { data, error, mutate } = useSWR<
    SWRResponse<PaginationResult<ProvincialEnrollResponseDto[]>>
  >(
    [
      `/provincial/enroll/adm`,
      {
        params: { elementCnt, page },
      },
    ],
    GET
  );
  return { data: data?.data, error, mutate };
}

export function useCourseInfoTrafficDetail(enrollSeq: number) {
  const { data, error, mutate } = useSWR<
    SWRResponse<ProvincialEnrollResponseDto>
  >(`/provincial/enroll/adm/${enrollSeq}`, GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function getCourseInfoTrafficDetail(enrollSeq: number) {
  return GET<{ data: ProvincialEnrollResponseDto }>(
    `/provincial/enroll/adm/${enrollSeq}`
  );
}

export function updateCourseInfoTrafficDetail({
  enrollSeq,
  enrollInput,
}: {
  enrollSeq: number;
  enrollInput: ProvincialEnrollUpdateRequestDto;
}) {
  return PUT(`/provincial/enroll/adm/${enrollSeq}`, enrollInput);
}
