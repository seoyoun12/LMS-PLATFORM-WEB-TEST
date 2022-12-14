import { DELETE, GET, POST } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import {
  ProvincialBoardResponseDto,
  ProvincialBoardSaveRequestDto,
} from "../Api";


export function courseTrafficList({
  elementCnt,
  page,
}: {
  elementCnt?: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<
    SWRResponse<PaginationResult<ProvincialBoardResponseDto[]>>
  >(
    [
      `/provincial/board/adm`,
      {
        params: { elementCnt, page },
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
