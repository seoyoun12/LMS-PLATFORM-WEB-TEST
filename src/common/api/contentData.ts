import { get, post, put } from '@common/httpClient';
import { PRODUCT_STATUS } from '@common/api/course';
import useSWR from 'swr';
import { FetchPaginationResponse, PaginationResult, SWRResponse } from '@common/constant';

export interface ContentInput {
  contentType: 'CONTENT_HTML' | 'CONTENT_MP4' | 'CONTENT_EXTERNAL' | string;
  contentName: string;
  contentWidth: number;
  contentHeight: number;
  status: PRODUCT_STATUS;
}

export interface ContentData {
  code: string;
  contentHeight: number;
  contentName: string;
  contentType: 'CONTENT_HTML' | 'CONTENT_MP4' | 'CONTENT_EXTERNAL';
  contentWidth: number;
  createdDtime: string;
  examCnt: number;
  homeworkCnt: number;
  lessonCnt: number;
  modifiedDtime: string;
  questionCnt: number;
  seq: number;
  status: PRODUCT_STATUS;
}

export async function uploadContent(contentInput: ContentInput) {
  return await post(`/content/adm`, contentInput);
}

export async function modifyContent({ contentId, contentInput }: { contentId: number, contentInput: ContentInput }) {
  return await put(`/content/adm/${contentId}`, contentInput);
}

export function useContentList({ page, elementCnt }: {
  page: number,
  elementCnt?: number,
}) {
  const { data, error } = useSWR<FetchPaginationResponse<ContentData[]>>([
    `/content/adm`, {
      params: { page, elementCnt }
    }
  ], get);

  return {
    data: data?.data,
    error
  };
}

export function useContent(contentId: number) {
  const { data, error } = useSWR<SWRResponse<ContentData>>([ `content/adm/${contentId}` ], get);

  return {
    data,
    error
  };
}
