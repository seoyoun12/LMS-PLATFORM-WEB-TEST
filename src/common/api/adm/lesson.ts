import useSWR, { SWRResponse } from 'swr';
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { Lesson, LessonInput } from '@common/api/lesson';
import { BbsType, deleteFile } from '@common/api/adm/file';

export function useLessonList(contentSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<Lesson[]>>(contentSeq ? `/lesson/${contentSeq}` : null, GET);

  return {
    lessonList: data?.data,
    lessonListError: error,
    mutate
  };
}

export function useLesson(lessonSeq: number | null) {
  const { data, error , mutate } = useSWR<SWRResponse<Lesson>>(lessonSeq ? `/lesson/detail/${lessonSeq}` : null, GET);
  // const {  } = useSWR<SWRResponse<Lesson>>(lessonSeq ? `/lesson/adm/interaction/${lessonSeq}` : null, PUT);
  
  const updateInteraction = async(isInteraction: boolean) => {
    await PUT(`/lesson/adm/interaction/${lessonSeq}?interaction=${isInteraction}`);
    mutate();
  }

  return {
    lesson: data?.data,
    lessonError: error,
    lessonMutate: mutate,
    updateInteraction
  };
}

export function uploadLessons({ contentSeq, lessonInput }: {
  contentSeq: number,
  lessonInput: LessonInput[]
}) {
  return POST(`/lesson/adm/${contentSeq}`, lessonInput);
}

export async function modifyLesson({ lessonSeq, lesson }: {
  lessonSeq: number,
  lesson: Lesson,
}) {
  return PUT(`/lesson/adm/modification/${lessonSeq}`, lesson);
}

export async function removeLesson(lessonSeq: number) {
  return await DELETE(`/lesson/adm/delete/${lessonSeq}`);
}


// 업로드
export async function lessonUpload({ contentSeq, lessonInput }:{
  contentSeq?: number, 
  lessonInput : LessonInput[]
}) {
  return await POST(`/lesson/adm/${contentSeq}`, lessonInput);
}

