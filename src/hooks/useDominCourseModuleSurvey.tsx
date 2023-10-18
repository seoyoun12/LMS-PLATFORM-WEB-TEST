import { GET } from '@common/httpClient'
import useSWR from 'swr';

interface Props {
  page: number;
  rowsPerPage: number;
}

interface MultipleChoice {
  seq: number,
  item1: string | number,
  item2: string | number,
  item3: string | number,
  item4: string | number,
  item5: string | number,
  item6: string | number,
  item7: string | number,
  item8: string | number,
  item9: string | number,
  item10: string | number,
  createdDtime: string,
  modifiedDtime: string,
  status: number
}

interface Question {
  seq: number,
  questionType: "TYPE_MULTIPLE_CHOICE",
  content: string,
  surveyMultipleChoice: MultipleChoice[],
  answered: null,
  createdDtime: string,
  modifiedDtime: string,
  status: number
}

interface Survey {
  seq: number,
  title: string,
  itemCnt: number,
  courseSeq: number | null,
  surveyQuestionList: Question[],
  createdDtime: string,
  modifiedDtime: string,
  status: number
}

interface SurveyResponse {
  data: {
      content: Survey[];
      createdDtime: string;
      modifiedDtime: string;
      status: number
      totalElements: number,
      totalPages: number,
      last: boolean,
      number: number,
      size: number,
      numberOfElements: number,
      first: boolean,
      empty: boolean
  }
}


export default function useDominCourseModuleSurvey({ page, rowsPerPage }: Props = {page:0, rowsPerPage:10}) {
    
  const { data, error, mutate } = useSWR<SurveyResponse>(`/survey/adm?page=${page}&elementCnt=${rowsPerPage}`,GET)


  return {data, error, mutate}
}
