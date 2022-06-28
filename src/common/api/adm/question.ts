import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import { Question, QuestionInput } from '@common/api/question';

export function useQuestionList({ contentId, page, elementCnt }: {
  contentId: number, page: number, elementCnt?: number
}) {
  const key = contentId
    ? [ `/question/adm`, { params: { contentSeq: contentId, page, elementCnt } } ]
    : null;

  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Question[]>>>(key, GET);

  return {
    questionPaginationResult: data?.data,
    questionPaginationResultError: error,
    mutate
  };
}

export function useQuestion(questionId: number | null) {
  const { data, error } = useSWR<SWRResponse<Question>>(questionId ? `/question/adm/${questionId}` : null, GET);

  return {
    question: data?.data,
    questionError: error,
  };
}

export function uploadQuestion(questionInput: QuestionInput) {
  return POST(`/question/adm`, questionInput);
}

export function modifyQuestion(questionId: number, questionInput: QuestionInput) {
  return PUT(`/question/adm/${questionId}`, questionInput);
}

export async function removeQuestion(questionId: number) {
  return await DELETE(`/question/adm/${questionId}`);
}
