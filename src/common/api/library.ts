import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';

export enum LibraryStatus {
  APPROVE = 1,
  REJECT = -1,
}

export interface Library {
  courseId: number,
  createdDtime: string,
  hit: number,
  modifiedDtime: string,
  regIp : string, // 작성자 IP
  seq: number,
  status: number,
  subject: string,
  updIp : string, // 수정자 IP
  userSeq: number,
  s3Files: S3Files;
}

export interface LibraryInput {
  courseId: number,
  createdDtime?: string,
  hit: number,
  modifiedDtime: string,
  regIp: string,
  seq: number,
  status: number,
  subject: string,
  updIp: string,
  userSeq: number,
  s3Files: S3Files;
}


export function libraryList({ courseId, page, elementCnt }: {
  courseId: number,
  page: number,
  elementCnt?: number
}) {
  const key = courseId
    ? [`/library/tutor`, { params: { courseSeq: courseId, page, elementCnt } }]
    : null;

  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Library[]>>>(key, GET);

  return {
    libraryPaginationResult: data?.data,
    libraryPaginationResultError: error,
    mutate
  };
}


export function useLibrary(seq: number | null) {
  const { data, error } = useSWR<SWRResponse<Library>>(seq ? `/library/tutor/${seq}`: null , GET);

  return {
    library : data?.data,
    libraryError : error
  }
}


export async function uploadLibrary(libraryInput: FormData) {
  return await POST(`/library/tutor`, libraryInput);
}


export async function modifyLibrary(seq: number, libraryInput: FormData) {
  return await PUT(`/library/tutor/${seq}`, libraryInput);
}


export async function removeLibrary(seq: number) {
  return await DELETE(`/library/tutor/${seq}`);
}