import { YN } from '@common/constant';
import { GET, POST, api } from '@common/httpClient';
import { RoleType } from 'src/staticDataDescElements/staticType';
import { StepsBySurveyForExcel } from '../Api';
import { FormType } from '@layouts/AdminCenter/CourseInfoManagement/CourseInfoManagement';

// 학습현황(운수/저상) 엑셀 다운로드
export function getExcelCourseLearning(body:FormType) {
  

  // 파라미터가 공백으로 들어가지 않게끔 필터링하는 로직
  const extractValidParams = {}

  for(const key in body) {
    // year 파라미터가 0일시 쿼리에서 제거
    if(body[key] || body[key] !== 0) {
      extractValidParams[key] = body[key];
    }
  }

  return api.get(
    `/adm/excel/download/course-learning-user`,
    {
      responseType: 'arraybuffer',
      params:extractValidParams,
    },
  );
}



// 학습현황(도민) 엑셀 다운로드
export function getExcelCourseTrafficLearning(params: any) {

  const extractValidParams = {}
  for(const key in params) {
    if(params[key]) {
      extractValidParams[key] = params[key];
    }
  }
  return api.get(
    `/adm/excel/download/provincial-learning-status`,
    {
      responseType: 'arraybuffer',
      params:extractValidParams, 
    },
  );
}

// 회원관리 리스트 엑셀다운로드
export function getExcelUserList(roleType: RoleType | string) {
  return POST(
    `/adm/excel/download/user`,
    { roleType },
    { params: { roleType }, responseType: 'blob' }
  );
}

/**
 * 특정 설문에 관한 기수를 조회하여 배열로 반환합니다.
 * @Param surveySeq : number
 * @return Array
 */
export function getExcelSurveyDetailStep(surveySeq: number) {
  return GET<{ data: StepsBySurveyForExcel[] }>(
    `/adm/excel/download/survey-detail/${surveySeq}/step`
  );
}

/**
 * 특정 설문에 관한 시퀀스를 받아 조회하여 엑셀로 다운합니다.
 * @Param surveySeq: number
 * @return blob
 */
export function downloadExcelSurveyDetail({
  surveySeq,
  courseClassSeq,
  isZipFile,
}: {
  surveySeq: number;
  courseClassSeq?: number | null;
  isZipFile: YN;
}) {
  const courseClassSeqPath = courseClassSeq
    ? `&courseClassSeq=${courseClassSeq}`
    : '';
  return POST(
    `/adm/excel/download/survey-detail/${surveySeq}?zipYn=${isZipFile}${courseClassSeqPath}`,
    {},
    { responseType: 'blob' }
  );
}
