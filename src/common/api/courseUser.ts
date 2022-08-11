import { GET } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { CourseUserResponseDto } from './types/Api';

export function useCourseUser() {
  const { data, error, mutate } = useSWR<SWRResponse<CourseUserResponseDto[]>>('/course-user', GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}
