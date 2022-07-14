import { YN } from "@common/constant";
import { GET, POST, PUT, DELETE } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import { S3File, S3Files } from "types/file";


export enum BoardType {
  TYPE_NOTICE = "TYPE_NOTICE", 
  TYPE_REVIEW = "TYPE_REVIEW", 
  TYPE_FAQ = "TYPE_FAQ"
}

export interface CategoryBoard {
  boardType: BoardType | string;
  content: string;
  courseSeq: number;
  createdDtime: string;
  hit: number;
  modifiedDtime: string;
  noticeYn: string;
  publicYn: string;
  s3Files: S3Files;
  seq: number;
  status: number;
  subject: string;
  userSeq: number;
  username: string;
}

// 카테고리게시판 공지사항 input
export interface CategoryBoardNoticeInput {
  boardType: string;
  content: string;
  courseSeq: number;
  noticeYn: string;
  publicYn: string;
  subject: string;
}

// 공지사항 리스트
export function categoryBoardNoticeList({ page, elementCnt, boardType } : {
  
  page: number;
  elementCnt?: number;
  boardType: string | null;

}) {

  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<CategoryBoard[]>>>([
    `/post`, {
      params: { page, elementCnt, boardType }
    }
  ], GET);

  return {

    data: data?.data,
    error,
    mutate

  };
  
}

// 공지사항 업로드
export async function uploadCategoryBoardNotice(CategoryBoardNoticeInput : FormData) {
  return await POST(`/post`, CategoryBoardNoticeInput);
}

// 공지사항 수정
export async function modifyCategoryBoardNotice(seq: number, CategoryBoardNoticeInput : FormData) {
  return await PUT(`/post/${seq}`, CategoryBoardNoticeInput);
}

// 공지사항 삭제
export async function removeCategoryBoardNotice(seq: number) {
  return await DELETE(`/post/${seq}`);
}





// 자주묻는질문(QnA) 리스트
export function categoryBoardQnaList() {

}

// 문의내역조회 리스트
export function categoryBoardLookList() {

}

