
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { IQuiz } from '@layouts/Lesson/LessonContentVideo';

import useSWR, { SWRResponse } from 'swr';

function useQuiz(seq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<IQuiz[]>>(seq ? `/lesson/quiz/${seq}` : null, GET);
  // post use SWR
  // const { data:postData, error:postError, mutate:postMutate } = useSWR<SWRResponse<IQuiz>>(seq ? `/lesson/quiz/${seq}` : null, POST, {});

  const updateQuiz = async (lessonQuizSeq: number, data: Partial<IQuiz>) => {
    await PUT(`/lesson/quiz/adm/${lessonQuizSeq}`, data);
    mutate();
  }

  const createQuiz = async (data: Partial<IQuiz>) => {
    await POST(`/lesson/quiz/adm?lessonSeq=${seq}`, data);
    mutate();
  }

  const deleteQuiz = async (lessonQuizSeq: number) => {
    await DELETE(`/lesson/quiz/adm/${lessonQuizSeq}`);
    mutate();
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