import { YN } from '@common/constant';
import { GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';

export enum QnaType {
  TYPE_SIGNUP_OR_SIGNIN = 'TYPE_SIGNUP_OR_SIGNIN',
  TYPE_EDU_OR_COMPLETE = 'TYPE_EDU_OR_COMPLETE',
  TYPE_WEB_OR_APP = 'TYPE_WEB_OR_APP',
  TYPE_ETC = 'TYPE_ETC',
}

export enum smsYn {
  SMSY = 'Y',
  SMSN = 'N'
}

export enum AnsweredYn {
  ANSWEREDY = 'Y',
  ANSWEREDN = 'N',
}

export interface Qna {
  answeredYn: AnsweredYn; // 위에 enum타입 만들어두고 YN을 임포트해온건 대체 뭘까
  content: string;
  createdDtime: string;
  createdDtimeYmd: string;
  modifiedDtime: string;
  qnaAnswer: QnaAnswer;
  s3Files: S3Files;
  seq: number;
  status: number;
  title: string;
  type: QnaType;
  userSeq: number;
  username: string;
  name: string;
  smsYn: string;
}

export type QnaInput = Partial<Qna>;

export interface QnaAnswer {
  content: string;
  createdDtime: string;
  modifiedDtime: string;
  s3Files: S3Files;
  seq: number;
  status: number;
}

// export interface QnaAnswerInput {
//   content: string;
// }
export type QnaAnswerInput = Partial<QnaAnswer>;

// qna list
export function qnaList({ page, elementCnt }: { page: number; elementCnt?: number }) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Qna[]>>>(
    [
      `/qna`,
      {
        params: { page, elementCnt },
      },
    ],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

// qna adm list
export function qnaAdmList({ page, elementCnt }: { page: number; elementCnt?: number }) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Qna[]>>>(
    [
      `/qna/adm`,
      {
        params: { page, elementCnt },
      },
    ],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

// qna detail
export function qnaDetail(seq: number | null) {
  const { data, error } = useSWR<SWRResponse<Qna>>(seq ? `/qna/adm/${seq}` : null, GET);
  return {
    data: data?.data,
    error: error,
  };
}

// qna list
export async function qnaAnswerList(seq: number) {
  return await GET(`/qna/adm/${seq}`);
}

// qna upload
export async function uploadQna(qnaInput: QnaInput) {
  return await POST(`/qna`, qnaInput);
}

// answer upload
export async function uploadQnaAnswer(
  seq: number | null,
  qnaAnswerInput: QnaAnswerInput
) {
  return await POST(`/qna/adm/${seq}`, qnaAnswerInput);
}
