import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';
import { CourseInput, CourseRes } from '@common/api/course';

export async function uploadCourse(courseInput: CourseInput) {
  return await POST(`/course/adm`, courseInput);
}

export async function modifyCourse({ courseId, courseInput }: { courseId: number, courseInput: CourseInput }) {
  return await PUT(`/course/adm/${courseId}`, courseInput);
}

export function useCourse(courseId?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(courseId ? `/course/${courseId}` : null, GET);
  return {
    course: data?.data,
    courseError: error,
    mutate
  };
}

export function removeCourse({ courseId }: { courseId: number }) {
  return DELETE(`/course/adm/${courseId}`);
}

export function useCourseList({ page, courseTitle, elementCnt, chapter }: {
  page: number,
  courseTitle?: string,
  elementCnt?: number,
  chapter?: string
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseRes[]>>([
    `/course/adm`, {
      params: { page, courseTitle, elementCnt, chapter }
    }
  ], GET);

  return {
    data: data?.data,
    error
  };
}

export const connectCourseToContent = async ({ courseSeq, contentSeq }: { courseSeq: number, contentSeq: number }) => {
  return await POST(`/course/adm/link/content`, { courseSeq, contentSeq });
};

export const disConnectContent = async (courseSeq: number) => {
  return await DELETE(`/course/adm/link/content/${courseSeq}`);
};
