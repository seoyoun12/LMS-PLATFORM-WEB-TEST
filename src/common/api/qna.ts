import { YN } from "@common/constant";
import { GET, POST } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import { S3Files } from "types/file";

export enum QnaType {

  TYPE_SIGNUP_OR_SIGNIN = "TYPE_SIGNUP_OR_SIGNIN",
  TYPE_EDU_OR_COMPLETE = "TYPE_EDU_OR_COMPLETE",
  TYPE_WEB_OR_APP = "TYPE_WEB_OR_APP",
  TYPE_ETC = "TYPE_ETC"

}

export enum AnsweredYn {
  ANSWEREDY = "Y",
  ANSWEREDN = "N"
}

export interface Qna {

  answeredYn: string;
  content: string;
  createdDtime: string;
  modifiedDtime: string;
  qnaAnswer: QnaAnswer;
  s3Files: S3Files;
  seq: number;
  status: number;
  title: string;
  type: QnaType;
  userSeq: number;

}

export interface QnaAnswer {

  content: string;
  createdDtime: string;
  modifiedDtime: string;
  s3Files: S3Files;
  seq: number;
  status: number;

}

export interface QnaInput {

  content: string;
  phone: string;
  smsYn: YN;
  title: string;
  type: QnaType;
  s3Files: S3Files;

}

export interface QnaAnserList {
  
  content: string;

}



// 1:1문의 리스트 조회
// export async function qn1aList() {
//   return await GET(`/qna`, {
//     headers: {
//       ACCESS_TOKEN: 'login-token'
//     }
//   });
// }


// qna list
export function qnaList({ page, elementCnt } : {
  page: number;
  elementCnt?: number;
}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Qna[]>>>([
    `/qna`, {
      params: { page, elementCnt }
    }
  ], GET);
  return {
    data: data?.data,
    error,
    mutate
  }
}

// qna answer
export async function qnaAnswerList(qnaSeq : number) {
  return await GET(`/qna/adm/${qnaSeq}`)
}


// qna upload
export async function uploadQna(qnaInput : QnaInput) {
  return await POST(`/qna`, qnaInput)
}