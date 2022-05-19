import { get, post, put } from '@common/httpClient';
import { PRODUCT_STATUS } from '@common/api/course';
import useSWR from 'swr';
import { FetchPaginationResponse, PaginationResult, SWRResponse } from '@common/constant';

export enum ContentType {
  CONTENT_HTML = 'CONTENT_HTML',
  CONTENT_MP4 = 'CONTENT_MP4',
  CONTENT_EXTERNAL = 'CONTENT_EXTERNAL'
}

export interface ContentInput {
  contentType: ContentType | string;
  contentName: string;
  contentWidth: number;
  contentHeight: number;
  status: PRODUCT_STATUS;
}

export interface ContentData {
  code: string;
  contentHeight: number;
  contentName: string;
  contentType: ContentType;
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
  const { data, error } = useSWR<SWRResponse<ContentData>>([ contentId ? `content/adm/${contentId}` : null ], get);

  return {
    data: data?.data,
    error
  };
}
