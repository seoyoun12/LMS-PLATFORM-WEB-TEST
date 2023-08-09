
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { IQuiz } from '@layouts/Lesson/LessonContentVideo';

import useSWR, { SWRResponse } from 'swr';

function useQuiz(lessonSeq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<IQuiz[]>>(lessonSeq ? `/lesson/quiz/${lessonSeq}` : null, GET);
  
  const updateQuiz = async (lessonQuizSeq: number, form: Partial<IQuiz>) => {
    await PUT(`/lesson/quiz/adm/${lessonQuizSeq}`, form);
    await mutate();
  }

  const createQuiz = async (form: Partial<IQuiz>) => {
    await POST(`/lesson/quiz/adm?lessonSeq=${lessonSeq}`, form);
    await mutate();
  }

  const deleteQuiz = async (lessonQuizSeq: number) => {
    await DELETE(`/lesson/quiz/adm/${lessonQuizSeq}`);
    await mutate();
  }
  
  return {
    quiz: data?.data,
    error,
    mutate,
    updateQuiz,
    createQuiz,
    deleteQuiz
  }
}

export default useQuiz