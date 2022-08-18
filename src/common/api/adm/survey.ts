import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';
import { ProductStatus } from '../course';
import { SurveyRequestDto } from '../types/Api';

export interface SurveyRes {
  seq: number;
  title: string;
  courseSeq: number;
  createdDtime: string;
  itemCnt: number;
  modifiedDtime: string;
  status: ProductStatus;
  surveyQuestionList: SurveyQuestion[];
}

export enum QuestionType {
  TYPE_MULTIPLE_CHOICE = 'TYPE_MULTIPLE_CHOICE',
  TYPE_SUBJECTIVE = 'TYPE_SUBJECTIVE',
}

export interface SurveyMultipleChoice {
  createdDtime: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  item6: string;
  item7: string;
  item8: string;
  item9: string;
  item10: string;
  modifiedDtime: string;
  seq: number;
  status: number;
}

export interface SurveyQuestion {
  content: string;
  createdDtime: string;
  modifiedDtime: string;
  questionType: QuestionType;
  seq: number;
  status: number;
  surveyMultipleChoice: SurveyMultipleChoice;
}

//get multiple res
export function useSurveyAdm({ page, title }: { page: number; title?: string }) {
  const { data, error, mutate } = useSWR<FetchPaginationResponse<SurveyRes[]>>(
    [`/survey/adm`, { params: { page, title } }],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

// get one response
export function getSingleSurvey(surveySeq: number) {
  return GET<{ data: SurveyRes }>(`/survey/adm/${surveySeq}`);
}

export function modifySurvey(surveySeq: number, req: SurveyRequestDto) {
  return PUT(`/survey/adm/${surveySeq}`, req);
}

export function uploadSurvey(req: SurveyRequestDto) {
  return POST(`/survey/adm/`, req);
}

export function deleteSurvey(seq: number) {
  return DELETE(`/survey/adm/${seq}`);
}
