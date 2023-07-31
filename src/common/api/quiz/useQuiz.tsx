
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { IQuiz } from '@layouts/Lesson/LessonContentVideo';

import useSWR, { SWRResponse } from 'swr';

function useQuiz(seq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<IQuiz[]>>(seq ? `/lesson/quiz/${seq}` : null, GET);
  
  return {
    quiz: data?.data,
    error,
    mutate
  }
}

export default useQuiz