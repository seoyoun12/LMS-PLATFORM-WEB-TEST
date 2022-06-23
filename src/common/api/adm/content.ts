import { GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';
import { ContentInput, ContentRes } from '@common/api/content';

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
