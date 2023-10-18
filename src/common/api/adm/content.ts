import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { ContentInput, Content } from '@common/api/content';

export async function uploadContent(contentInput: ContentInput) {
  return await POST(`/content/adm`, contentInput);
}

export async function modifyContent({ contentSeq, contentInput }: { contentSeq: number, contentInput: ContentInput }) {
  return await PUT(`/content/adm/${contentSeq}`, contentInput);
}

export function useContentList({ page, elementCnt, contentName }: {page: number;contentName?: string | null;elementCnt?: number }) {
  const { data, error, mutate } = useSWR<FetchPaginationResponse<Content[]>>([
    `/content/adm`, {
      params: { page, elementCnt, contentName }
    }
  ], GET);

  return {
    data: data?.data,
    mutate,
    error
  };
}

export function useContent(contentSeq: number) {
  const { data, error } = useSWR<SWRResponse<Content>>(contentSeq ? [`content/adm/${contentSeq}`] : null, GET);

  return {
    data: data?.data,
    error
  };
}

//----------------------------------------------------------------//
//------------20220809 content interface & method 생성------------//
//----------------------------------------------------------------//

// 20220809 contentAdmList
export function contentAdmList({ contentName, elementCnt, page }: {
  contentName?: string;
  elementCnt?: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Content[]>>>([
    `/content/amd`, {
      params: { contentName, elementCnt, page }
    }
  ], GET)

  return {
    data: data?.data,
    error,
    mutate
  }
}

// 20220809 contentUpload
export async function contentUpload(contentInput: ContentInput) {
  return await POST(`/content/adm`, contentInput)
}

// 20220809 contentDetail
export function contentDetail(seq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<Content>>(seq ? `/content/adm/${seq}` : null, GET);
  return {
    data: data?.data,
    error,
    mutate
  };
}

// 20220809 contentModify
export async function contentModify({ seq, contentInput }: {
  seq: number,
  contentInput: ContentInput
}) {
  return await PUT(`/content/adm/${seq}`, contentInput);
}

// 20220809 contentRemove
export async function contentRemove(seq: number) {
  return await DELETE(`/content/adm/${seq}`);
}