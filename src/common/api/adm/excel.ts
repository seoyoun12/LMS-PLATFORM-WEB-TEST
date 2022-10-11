import { GET, POST } from '@common/httpClient';

export function getExcelCourseLearning() {
  return POST(`/adm/excel/download/course-learning-user`, {}, { responseType: 'blob' });
}

export function getExcelSurveyDetail(surveySeq: number) {
  return POST(
    `/adm/excel/download/survey-detail/${surveySeq}`,
    {},
    { responseType: 'blob' }
  );
}

// 회원관리 리스트 엑셀다운로드
export function getExcelUserList() {
  return POST(`/adm/excel/download/user`,{}, { responseType: 'blob' })
}