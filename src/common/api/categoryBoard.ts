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
  seq: number;
  status: number;
  subject: string;
  userSeq: number;
  username: string;
  s3Files: S3Files;
}

// 카테고리게시판 공지사항 input

// export type CategoryBoardInput = Partial<CategoryBoard>;
export interface CategoryBoardInput {
  s3Files: S3Files;
  boardType: string;
  content: string;
  courseSeq: number;
  noticeYn: string;
  publicYn: string;
  subject: string;
}

// 공지사항 리스트
export function categoryBoardList({ page, elementCnt, boardType } : {
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

// 게시판 상세
export function useCategoryBoard(seq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<CategoryBoard>>(seq? `/post/adm/${seq}` : null, GET);
  return {
    data: data?.data,
    error,
    mutate
  };
}

// 게시판 업로드
export async function uploadCategoryBoard(CategoryBoardInput : CategoryBoardInput) {
  return await POST(`/post`, CategoryBoardInput);
}

// 게시판 수정
export async function modifyCategoryBoard({seq, categoryBoardInput} : {
  seq: number, categoryBoardInput : CategoryBoardInput
}) {
  return await PUT(`/post/${seq}`, categoryBoardInput);
}


// 게시판 삭제
export async function removeCategoryBoard(seq: number) {
  return await DELETE(`/post/${seq}`);
}





// // 자주묻는질문(QnA) 리스트
// export function categoryBoardQnaList() {

// }

// // 문의내역조회 리스트
// export function categoryBoardLookList() {

// }
