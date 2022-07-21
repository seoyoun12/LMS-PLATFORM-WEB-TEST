import { YN } from "@common/constant";
import { GET, POST, PUT, DELETE } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import { S3File, S3Files } from "types/file";

export enum QnaType {
  TYPE_SIGNUP_OR_SIGNIN = "TYPE_SIGNUP_OR_SIGNIN", 
  TYPE_EDU_OR_COMPLETE = "TYPE_EDU_OR_COMPLETE", 
  TYPE_WEB_OR_APP = "TYPE_WEB_OR_APP",
  TYPE_ETC  = "TYPE_ETC"
}

export interface CategoryQna {
  answeredYn: string;
  content: string;
  createdDtime:	string;
  modifiedDtime:	string;
  qnaAnswer:	QnaAnswer;
  s3Files: S3Files;
  seq: number;
  status:	number;
  title:	string;
  type:	string;
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

// 1:1문의 POST
export async function categoryQnaList() {
  return await GET(`qna`, {
    headers: {
      ACCESS_TOKEN: 'login-token'
    }
  });
}





