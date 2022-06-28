import { GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse } from 'types/fetch';
import { S3Files } from 'types/file';
import { ContentRes } from '@common/api/content';
import { Lesson } from '@common/api/lesson';

export enum ProductStatus {
  APPROVE = 1,
  REJECT = -1,
}

export type CourseInput = Partial<CourseRes>;

export interface CourseRes {
  content: ContentRes;
  content1: string;
  courseFile: string;
  courseName: string;
  courseSubName: string;
  courseThumbLink: string;
  createdDtime: string;
  displayYn: YN;
  fullScore: number;
  lessonTerm: number;
  lessonTime: number;
  lessons: Lesson[];
  limitPeople: number;
  limitPeopleYn: string;
  limitTotalScore: number;
  modifiedDtime: string;
  price: number;
  restudyDay: number;
  restudyYn: string;
  saleYn: string;
  seq: number;
  status: ProductStatus;
  s3Files: S3Files;

  // 임시용 타입
  curriculum: {
    title: string;
    panel: number;
    contents: {
      title: string
    }[];
  }[];
}

export function useCourse(courseId?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(courseId ? `/course/${courseId}` : null, GET);
  return {
    course: data?.data,
    courseError: error,
    mutate
  };
}

export function useCourseList({ page, courseTitle, elementCnt, chapter }: {
  page: number,
  courseTitle?: string,
  elementCnt?: number,
  chapter?: string
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseRes[]>>([
    `/course`, {
      params: { page, courseTitle, elementCnt, chapter }
    }
  ], GET);

  return {
    data: data?.data,
    error
  };
}

export function courseEnroll(courseId: number) {
  return POST(`/course/enroll/${courseId}`);
}
