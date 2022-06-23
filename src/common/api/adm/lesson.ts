import useSWR, { SWRResponse } from 'swr';
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { Lesson, LessonInput } from '@common/api/lesson';

export function useLessonList(contentId: number) {
  const { data, error, mutate } = useSWR<SWRResponse<Lesson[]>>(contentId ? `/lesson/adm/${contentId}` : null, GET);

  return {
    lessonList: data?.data,
    lessonListError: error,
    mutate
  };
}

export function useLesson(lessonId: number | null) {
  const { data, error } = useSWR<SWRResponse<Lesson>>(lessonId ? `/lesson/adm/detail/${lessonId}` : null, GET);

  return {
    lesson: data?.data,
    lessonError: error,
  };
}

export function uploadLessons({ contentId, lessonInput }: {
  contentId: number,
  lessonInput: LessonInput[]
}) {
  return POST(`/lesson/adm/${contentId}`, lessonInput);
}

export function modifyLesson({ lessonId, formData }: {
  lessonId: number,
  formData: FormData
}) {
  return PUT(`/lesson/adm/modification/${lessonId}`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function removeLesson(lessonId: number) {
  return await DELETE(`/lesson/adm/delete/${lessonId}`);
}
