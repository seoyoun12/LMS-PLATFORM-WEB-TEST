import { S3Files } from "types/file";

export enum QnaType {

  TYPE_SIGNUP_OR_SIGNIN = "TYPE_SIGNUP_OR_SIGNIN",
  TYPE_EDU_OR_COMPLETE = "TYPE_EDU_OR_COMPLETE",
  TYPE_WEB_OR_APP = "TYPE_WEB_OR_APP",
  TYPE_ETC = "TYPE_ETC"

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

// Qna 리스트
export function qnaList () {
  
}