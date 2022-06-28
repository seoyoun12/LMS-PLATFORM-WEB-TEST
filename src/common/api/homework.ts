import { DELETE, GET, POST, PUT } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import { S3Files } from "types/file";

export enum HomeworkStatus {
  APPROVE = 1,
  REJECT = -1
}

export interface Homework {
  bestAnswer: string,
  contentSeq: number,
  createdDtime: string,
  markingRole: string,
  modifiedDtime: string,
  s3Files: S3Files,
  seq: number,
  status: number,
  subject: string
}

export interface HomeworkInput {
  bestAnswer: string,
  content: string,
  contentSeq: number,
  markingRole: string,
  s3Files: S3Files,
  status: number,
  subject: string  
}

// 전체 조회
export function homeworkList({contentSeq, page, elementCnt} : {
  contentSeq : number,
  page : number,
  elementCnt? : number
}) {
  const key = contentSeq
  ? [`/homework/adm`, { params : { contentSeq : contentSeq, page, elementCnt } }]
  : null;

  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Homework[]>>>(key, GET);
  
  return {
    pageData : data?.data,
    pageError : error,
    mutate
  }
}

// 과제 상세조회
export function detailHomework(seq: number | null) {
  const { data, error } = useSWR<SWRResponse<Homework>>(seq ? `/homework/adm/${seq}`: null , GET);

  return {
    detailData : data?.data,
    detailError : error
  }
}

// 과제 생성
export async function uploadHomework(homeworkInput : FormData) {
  return await POST(`/homework/adm`, homeworkInput);
}

// 과제 일괄 생성
export async function uploadBatchHomework() {
  // 잠시 보류
}


// 과제 수정
export async function modifyHomework(seq : number, homeworkInput : FormData) {
  return await PUT(`/homework/adm/${seq}`, homeworkInput);
}

export async function removeHomework(seq : number) {
  return await DELETE(`/homework/admin/${seq}`);
}