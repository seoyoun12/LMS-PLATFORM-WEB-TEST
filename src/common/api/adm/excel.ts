import { YN } from '@common/constant';
import { GET, POST } from '@common/httpClient';
import { RoleType } from 'src/staticDataDescElements/staticType';
import { StepsBySurveyForExcel } from '../Api';

export function getExcelCourseLearning() {
  return POST(`/adm/excel/download/course-learning-user`, {}, { responseType: 'blob' });
}

// export function getExcelSurveyDetail(surveySeq: number) {
//   return POST(
//     `/adm/excel/download/survey-detail/${surveySeq}`,
//     {},
//     { responseType: 'blob' }
//   );
// }

// 회원관리 리스트 엑셀다운로드
export function getExcelUserList(roleType : RoleType | string) {
  return POST(`/adm/excel/download/user`,{roleType},  { params : {roleType}, responseType: 'blob' });
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
  const courseClassSeqPath = courseClassSeq ? `&courseClassSeq=${courseClassSeq}` : '';
  return POST(
    `/adm/excel/download/survey-detail/${surveySeq}?zipYn=${isZipFile}${courseClassSeqPath}`,
    {},
    { responseType: 'blob' }
  );
}
