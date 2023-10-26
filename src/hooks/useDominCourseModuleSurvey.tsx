import { GET, POST } from '@common/httpClient'
import useSWR from 'swr';
import { useSnackbar } from './useSnackbar';

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

export enum ModuleType {
  COURSE_MODULE_PROGRESS_RATE = 'COURSE_MODULE_PROGRESS_RATE',
  COURSE_MODULE_TEST = 'COURSE_MODULE_TEST',
  COURSE_MODULE_SURVEY  ='COURSE_MODULE_SURVEY'
}

interface ConnectSurveyToCourseRequest {
  examSeq?: number,
  limitProgress?: number,
  limitScore?: number,
  moduleName?: string,
  moduleType?: ModuleType,
  status?: number,
  submitYn?: "Y" | "N",
  surveySeq?: number
}

export default function useDominCourseModuleSurvey({ page, rowsPerPage }: Props = {page:0, rowsPerPage:10}) {
    
  const { data, error, mutate } = useSWR<SurveyResponse>(`/survey/adm?page=${page}&elementCnt=${rowsPerPage}`,GET)
  const snackBar = useSnackbar();

  const postConnectSurveyToCourse = async (courseSeq: number, body: ConnectSurveyToCourseRequest) => {
    try {
      await POST(`/course-module/adm/${courseSeq}`,body)
      snackBar({
        message: '해당 과정과 연결되었습니다.',
        variant: 'success'
      })
    } catch (error) {
      snackBar({
        message: '연결에 실패하였습니다.',
        variant: 'error'
      })
    }
    
  }

  return {data, error, mutate, postConnectSurveyToCourse}
}
