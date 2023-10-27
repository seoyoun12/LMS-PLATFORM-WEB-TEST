import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';
import { CourseInput, CourseRes } from '@common/api/course';
import { CourseDetailClientResponseDto, CourseModuleFindResponseDto } from '../Api';

export async function uploadCourse(courseInput: CourseInput) {
  return await POST(`/course/adm`, courseInput);
}

export async function modifyCourse({
  courseSeq,
  courseInput,
}: {
  courseSeq: number;
  courseInput: CourseInput;
}) {
  return await PUT(`/course/adm/${courseSeq}`, courseInput);
}

export function useCourse(courseSeq?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(
    courseSeq ? `/course/${courseSeq}` : null,
    GET
  );
  return {
    course: data?.data,
    courseError: error,
    mutate,
  };
}

export function removeCourse({ courseSeq }: { courseSeq: number }) {
  return DELETE(`/course/adm/${courseSeq}`);
}

// COURSE_TYPE_TRANS_WORKER
// COURSE_TYPE_ROW_FLOOR_BUS
// COURSE_TYPE_PROVINCIAL
// TYPE_TRANS_WORKER,
// TYPE_LOW_FLOOR_BUS,
// TYPE_PROVINCIAL

export function useCourseList({
  page,
  courseTitle,
  elementCnt,
  chapter,
  courseType = 'TYPE_TRANS_WORKER'
}: {
  page: number;
  courseTitle?: string | null;
  elementCnt?: number;
  chapter?: string;
  courseType?: string;
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseDetailClientResponseDto[]>>(
    [
      `/course/adm`,
      {
        params: { page, courseTitle, elementCnt, chapter,courseType },
      },
    ],
    GET
  );

  return {
    data: data?.data,
    error,
  };
}

export const connectCourseToContent = async ({
  courseSeq,
  contentSeq,
}: {
  courseSeq: number;
  contentSeq: number;
}) => {
  return await POST(`/course/adm/link/content`, { courseSeq, contentSeq });
};

export const disConnectContent = async (courseSeq: number) => {
  return await DELETE(`/course/adm/link/content/${courseSeq}`);
};

export function useCourseModule(courseSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseModuleFindResponseDto[]>>(
    [`/course-module/adm`, { params: { courseSeq } }],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}
