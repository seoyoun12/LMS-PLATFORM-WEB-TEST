import { deleteRequest, get, post, put } from '@common/httpClient';
import { ContentInput, ContentType } from '@common/api/content';
import { PRODUCT_STATUS } from '@common/api/course';
import useSWR, { SWRResponse } from 'swr';

export interface LessonInput {
  contentType?: ContentType;
  completeTime?: number;
  lessonNm?: string;
  mobileUrl?: string;
  pcUrl?: string;
  sort?: number;
  totalPage?: number;
  totalTime?: number;
}

export interface Lesson {
  completeTime: number,
  contentSeq: number;
  contentType: ContentType;
  createdDtime: string;
  lessonNm: string;
  mobileUrl: string;
  modifiedDtime: string;
  pcUrl: string;
  seq: number;
  sort: number,
  status: PRODUCT_STATUS;
  totalPage: number,
  totalTime: number
}

export function useLessonList(contentId: number) {
  const { data, error, mutate } = useSWR<SWRResponse<Lesson[]>>(contentId ? `/lesson/adm/${contentId}` : null, get);

  return {
    data: data?.data,
    error,
    mutate
  };
}

export function uploadLessons({ contentId, lessonInput }: {
  contentId: number,
  lessonInput: LessonInput[]
}) {
  return post(`/lesson/adm/${contentId}`, lessonInput);
}

export async function removeLesson(lessonId: number) {
  return await deleteRequest(`/lesson/adm/delete/${lessonId}`);
}
