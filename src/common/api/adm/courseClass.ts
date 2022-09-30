import { YN } from '@common/constant';
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { CourseClassResponseDto } from '../Api';
import { businessType, CourseClassRes } from '../courseClass';

export enum CourseType {
  TYPE_TRANS_WORKER = 'TYPE_TRANS_WORKER',
  TYPE_LOW_FLOOR_BUS = 'TYPE_LOW_FLOOR_BUS',
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL',
}

//admin 조회
export function useCourseClassAdm(
  businessType: businessType,
  date: string,
  courseType?: CourseType
) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseClassRes[]>>(
    [`/course-class/adm`, { params: { businessType, date, courseType } }],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function getDetailCourseClass(courseClassSeq: number) {
  return GET<{ data: CourseClassRes }>(`/course-class/adm/${courseClassSeq}`);
}

export interface CourseClassUpdateReqDto extends CourseClassResponseDto {
  courseClassSeq: number;
  limitPeople: number;
  limitPeopleYn: YN;
  requestEndDate: string;
  requestStartDate: string;
  step: number;
  studyEndDate: string;
  studyStartDate: string;
  year: number;
}

export function modifyCourseClass(CourseClassUpdateReq: CourseClassUpdateReqDto) {
  return PUT(`/course-class/adm`, CourseClassUpdateReq);
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
