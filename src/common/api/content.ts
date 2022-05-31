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

export interface ContentRes {
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
  courseName: string;
  courseSeq: number;
}

export async function uploadContent(contentInput: ContentInput) {
  return await POST(`/content/adm`, contentInput);
}

export async function modifyContent({ contentId, contentInput }: { contentId: number, contentInput: ContentInput }) {
  return await PUT(`/content/adm/${contentId}`, contentInput);
}

export function useContentList({ page, elementCnt, contentName }: {
  page: number;
  contentName?: string | null;
  elementCnt?: number;
}) {
  const { data, error, mutate } = useSWR<FetchPaginationResponse<ContentRes[]>>([
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

export function useContent(contentId: number) {
  const { data, error } = useSWR<SWRResponse<ContentRes>>(contentId ? [ `content/adm/${contentId}` ] : null, GET);

  return {
    data: data?.data,
    error
  };
}
