import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';
import { CourseInput, CourseRes } from '@common/api/course';

export async function uploadCourse(courseInput: CourseInput) {
  return await POST(`/course/adm`, courseInput);
}

export async function modifyCourse({ courseSeq, courseInput }: { courseSeq: number; courseInput: CourseInput }) {
  return await PUT(`/course/adm/${courseSeq}`, courseInput);
}

export function useCourse(courseSeq?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(courseSeq ? `/course/${courseSeq}` : null, GET);
  return {
    course: data?.data,
    courseError: error,
    mutate,
  };
}

export function removeCourse({ courseSeq }: { courseSeq: number }) {
  return DELETE(`/course/adm/${courseSeq}`);
}

export function useCourseList({
  page,
  courseTitle,
  elementCnt,
  chapter,
}: {
  page: number;
  courseTitle?: string | null;
  elementCnt?: number;
  chapter?: string;
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseRes[]>>(
    [
      `/course/adm`,
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

export const connectCourseToContent = async ({ courseSeq, contentSeq }: { courseSeq: number; contentSeq: number }) => {
  return await POST(`/course/adm/link/content`, { courseSeq, contentSeq });
};

export const disConnectContent = async (courseSeq: number) => {
  return await DELETE(`/course/adm/link/content/${courseSeq}`);
};
