import { GET, POST, PUT } from '@common/httpClient';
import { ProductStatus } from '@common/api/course';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';

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
  status: ProductStatus;
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
  status: ProductStatus;
}

export async function uploadContent(contentInput: ContentInput) {
  return await POST(`/content/adm`, contentInput);
}

export async function modifyContent({ contentId, contentInput }: { contentId: number, contentInput: ContentInput }) {
  return await PUT(`/content/adm/${contentId}`, contentInput);
}

export function useContentList({ page, elementCnt }: {
  page: number,
  elementCnt?: number,
}) {
  const { data, error } = useSWR<FetchPaginationResponse<ContentData[]>>([
    `/content/adm`, {
      params: { page, elementCnt }
    }
  ], GET);

  return {
    data: data?.data,
    error
  };
}

export function useContent(contentId: number) {
  const { data, error } = useSWR<SWRResponse<ContentData>>(contentId ? [ `content/adm/${contentId}` ] : null, GET);

  return {
    data: data?.data,
    error
  };
}
