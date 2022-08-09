import useSWR, { SWRResponse } from 'swr';
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { Lesson, LessonInput } from '@common/api/lesson';
import { BbsType, deleteFile } from '@common/api/adm/file';

export function useLessonList(contentSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<Lesson[]>>(contentSeq ? `/lesson/adm/${contentSeq}` : null, GET);

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

export function uploadLessons({ contentSeq, lessonInput }: {
  contentSeq: number,
  lessonInput: LessonInput[]
}) {
  return POST(`/lesson/adm/${contentSeq}`, lessonInput);
}

export async function modifyLesson({ lessonId, lesson }: {
  lessonId: number,
  lesson: Lesson,
}) {
  return PUT(`/lesson/adm/modification/${lessonId}`, lesson);
}

export async function removeLesson(lessonId: number) {
  return await DELETE(`/lesson/adm/delete/${lessonId}`);
}
