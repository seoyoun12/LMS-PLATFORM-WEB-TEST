import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';

export interface ForumInput {
  courseSeq: number;
  createdDtime: string;
  modifiedDtime: string;
  regIp: string;
  seq: number;
  status: number;
  subject: string;
  updIp: string;
  userSeq: number;
}

export interface Forum {
  courseSeq: number;
  createdDtime: string;
  modifiedDtime: string;
  regIp: string;
  seq: number;
  status: number;
  subject: string;
  updIp: string;
  userSeq: number;
}

export function useForumList({ courseId, page, elementCnt }: {
  courseId: number, page: number, elementCnt?: number
}) {
  const key = courseId
    ? [ `/forum/tutor`, { params: { courseSeq: courseId, page, elementCnt } } ]
    : null;

  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Forum[]>>>(key, GET);

  return {
    forumPaginationResult: data?.data,
    forumPaginationResultError: error,
    mutate
  };
}

export function useForum(forumId: number | null) {
  const { data, error } = useSWR<SWRResponse<Forum>>(forumId ? `/forum/tutor/${forumId}` : null, GET);

  return {
    Forum: data?.data,
    ForumError: error,
  };
}

export function uploadForum(forumInput: ForumInput) {
  return POST(`/forum/tutor`, forumInput);
}

export function modifyForum(forumId: number, forumInput: ForumInput) {
  return PUT(`/forum/tutor/${forumId}`, forumInput);
}

export async function removeForum(questionId: number) {
  return await DELETE(`/forum/tutor/${questionId}`);
}
