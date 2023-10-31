import { DELETE, GET, POST, PUT } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import {
  ProvincialBoardResponseDto,
  ProvincialBoardSaveRequestDto,
  ProvincialBoardUpdateRequestDto,
} from "../Api";

// 
export function courseTrafficList({ elementCnt,page,courseTitle,courseType }: {elementCnt?: number;page: number; courseTitle:string; courseType:string;}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<ProvincialBoardResponseDto[]>>>(
    [`/course/adm`,
      {
        params: { elementCnt, page,courseTitle,courseType, },
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

// upload
export async function courseTrafficUpload(
  courseTrafficInput: ProvincialBoardSaveRequestDto
) {
  return await POST(`/provincial/board/adm`, courseTrafficInput);
}

// remove
export async function courseTrafficRemove(boardSeq: number) {
  return await DELETE(`/provincial/board/adm/${boardSeq}`);
}

// modify
export async function courseTrafficModify({boardSeq, courseTrafficInput
} : {boardSeq: number; courseTrafficInput: ProvincialBoardUpdateRequestDto}) {
  return await PUT(`/provincial/board/adm/${boardSeq}`, courseTrafficInput)
}

// detail
export function courseTrafficDetail(boardSeq?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<ProvincialBoardResponseDto>>(
    boardSeq? `/provincial/board/adm/${boardSeq}` : null, GET
  )
  return {
    data: data?.data,
    error: error,
    mutate
  }
}