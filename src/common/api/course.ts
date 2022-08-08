import { GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';
import { ContentRes } from '@common/api/content';
import { Lesson } from '@common/api/lesson';
import { businessType, courseCategoryType, courseSubCategoryType } from './courseClass';
import { LargeNumberLike } from 'crypto';

export enum ProductStatus {
  APPROVE = 1,
  REJECT = -1,
}

export enum courseType {
  TYPE_TRANS_WOKER = 'TYPE_TRANS_WOKER', //운수종사자
  TYPE_LOW_FLOOR_BUS = 'TYPE_LOW_FLOOR_BUS', //저상버스
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL', //도민
}

export type CourseInput = Partial<CourseRes>;

export interface CourseRes {
  seq: number;
  content: ContentRes;
  courseCategoryType: courseCategoryType;
  courseName: string;
  courseSubCategoryType: courseSubCategoryType;
  courseBusinessType: businessType;
  courseType: courseType;
  createdDtime: string;
  displayYn: YN;
  lessonTime: number;
  lessons: Lesson[];
  modifiedDtime: string;
  s3Files: S3Files;
  status: ProductStatus;
}




export interface Course {

  contentName: string;
  contentSeq: LargeNumberLike;
  courseBusinessType: businessType;
  courseCategoryType: courseCategoryType;
  courseName: string;
  courseSubCategoryType: courseSubCategoryType;
  courseType: courseType;
  createdDtime: string;
  displayYn: YN,
  fileName: string;
  lessonTime: number;
  modifiedDtime: string;
  s3Files: S3Files
  seq: 0,
  status: 0

}

// 20220808 
export function courseList({ contentTitle, elementCnt, page } : {
  contentTitle: string;
  elementCnt: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Course[]>>> ([
    `/course`, {
      params: { contentTitle, elementCnt, page }
    }
  ], GET)
  
  return {
    data: data?.data,
    error,
    mutate
  }
}




export function useCourse(courseId?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(courseId ? `/course/${courseId}` : null, GET);
  return {
    course: data?.data,
    courseError: error,
    mutate,
  };
}

export function useCourseList({
  page,
  courseTitle,
  elementCnt,
  chapter,
}: {
  page: number;
  courseTitle?: string;
  elementCnt?: number;
  chapter?: string;
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseRes[]>>(
    [
      `/course`,
      {
        params: { page, courseTitle, elementCnt, chapter },
      },
    ],
    GET
  );

  return {
    data: data?.data,
    error,
  };
}

export function courseEnroll(courseId: number) {
  return POST(`/course/enroll/${courseId}`);
}
