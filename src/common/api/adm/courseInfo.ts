import { GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import {
  UserCourseInfoDetailCourseInfoDto,
  UserCourseInfoDetailLearningStatusDto,
  UserCourseInfoDetailProgressStatusDto,
} from '../Api';

interface DetailCourse {
  courseInfo?: UserCourseInfoDetailCourseInfoDto;
  learningStatusList?: UserCourseInfoDetailLearningStatusDto[];
  progressStatusList?: UserCourseInfoDetailProgressStatusDto[];
}

export function detailCourseInfo(courseUserSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<DetailCourse>>(
    courseUserSeq ? `/user/adm/course-info/detail/${courseUserSeq}` : null,
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function modifyCompleteAllCourseInfo(courseUserSeq: number) {
  return PUT(`/user/adm/course-info/progress/${courseUserSeq}/all-complete`);
}
export function modifyCancelAllCourseInfo(courseUserSeq: number) {
  return PUT(`/user/adm/course-info/progress/${courseUserSeq}/all-cancel`);
}

export function modifyCompleteCourseInfo(
  courseUserSeq: number,
  courseProgressSeq: number
) {
  return PUT(
    `/user/adm/course-info/progress/${courseUserSeq}/${courseProgressSeq}/complete`
  );
}

export function modifyCancelCourseInfo(courseUserSeq: number, courseProgressSeq: number) {
  return PUT(
    `/user/adm/course-info/progress/${courseUserSeq}/${courseProgressSeq}/cancel`
  );
}
