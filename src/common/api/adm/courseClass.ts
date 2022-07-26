import { YN } from '@common/constant';
import { DELETE, GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { businessType, CourseClassRes } from '../courseClass';

//admin 조회
export function useCourseClassAdm(businessType: businessType, date: string) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseClassRes[]>>([`/course-class/adm`, { params: { businessType, date } }], GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export interface CourseClassCreate {
  courseSeq: number;
  limitPeople: number | string;
  limitPeopleYn: YN;
  requestEndDate: string;
  requestStartDate: string;
  step: number;
  studyEndDate: string;
  studyStartDate: string;
  year: number;
}

export function courseClassCreate(CourseClassCreate: CourseClassCreate) {
  return POST(`/course-class/adm`, CourseClassCreate);
}

export function courseClassRemove(courseClassSeq: number) {
  return DELETE(`/course-class/adm/${courseClassSeq}`);
}
