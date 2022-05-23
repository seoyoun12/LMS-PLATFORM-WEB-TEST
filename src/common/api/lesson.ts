import { deleteRequest, get, post, put } from '@common/httpClient';
import { ContentInput, ContentType } from '@common/api/content';
import { PRODUCT_STATUS } from '@common/api/course';
import useSWR, { SWRResponse } from 'swr';
import { Files } from '@common/constant';

export interface LessonInput {
  contentType?: ContentType;
  completeTime?: number;
  lessonNm?: string;
  mobileUrl?: string;
  pcUrl?: string;
  sort?: number;
  totalPage?: number;
  totalTime?: number;
  min?: number;
  sec?: number;
}

export interface Lesson {
  completeTime: number;
  contentSeq: number;
  contentType: ContentType;
  createdDtime: string;
  lessonNm: string;
  mobileUrl: string;
  modifiedDtime: string;
  pcUrl: string;
  fileName: string;
  files: Files;
  seq: number;
  sort: number;
  status: PRODUCT_STATUS;
  totalPage: number;
  totalTime: number;
  min: number;
  sec: number;
}

export function useLessonList(contentId: number) {
  const { data, error, mutate } = useSWR<SWRResponse<Lesson[]>>(contentId ? `/lesson/adm/${contentId}` : null, get);

  return {
    lessonList: data?.data,
    lessonListError: error,
    mutate
  };
}

export function useLesson(lessonId: number | null) {
  const { data, error } = useSWR<SWRResponse<Lesson>>(lessonId ? `/lesson/adm/detail/${lessonId}` : null, get);

  return {
    lesson: data?.data,
    lessonError: error,
  };
}

export function uploadLessons({ contentId, lessonInput }: {
  contentId: number,
  lessonInput: LessonInput[]
}) {
  return post(`/lesson/adm/${contentId}`, lessonInput);
}

export function modifyLesson({ lessonId, formData }: {
  lessonId: number,
  formData: FormData
}) {
  return put(`/lesson/adm/modification/${lessonId}`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function removeLesson(lessonId: number) {
  return await deleteRequest(`/lesson/adm/delete/${lessonId}`);
}
